
/*
* author: onurkanbakırcı
*/

import React from "react";
import {TouchableOpacity,Animated, StyleSheet} from 'react-native';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface props{
    duration ? : number,
    from_deg : string,
    to_deg  : string,
    type ? : string
    delay ? :number,
    style ?:any
}
interface state{
    rotate : any,
    count:number,
    status : boolean
}

class RotateButton extends React.Component<props,state>{
    constructor(props:props){
        super(props)
    }
    state:state={
        rotate:new Animated.Value(1),
        count:1.5,
        status:true
    }
     async render_animation(){
        switch(this.props.type){
            case "shake" :
                Animated.timing(this.state.rotate,{
                    toValue :1.5,
                    delay:this.props.delay,
                    duration: this.props.duration?this.props.duration:500,
                    useNativeDriver:true
                }).start(()=>{
                    this.setState({rotate:new Animated.Value(1)})
                });break;
            case "comeback":
                Animated.timing(this.state.rotate,{
                    toValue :this.state.count,
                    duration:this.props.duration?this.props.duration:500,
                    useNativeDriver:true
                }).start(()=>{this.setState({count:1.5,rotate:new Animated.Value(1), status:!this.state.status})
               });
                break;
            case "infinite":
                Animated.timing(this.state.rotate,{
                    toValue :this.state.count,
                    duration: this.props.duration?this.props.duration:500,
                    useNativeDriver:true
                }).start(()=>{this.setState({count:this.state.count+0.5})});
                break;
            default:
                Animated.timing(this.state.rotate,{
                    toValue :1.5,
                    delay:this.props.delay,
                    duration: this.props.duration?this.props.duration:500,
                    useNativeDriver:true
                }).start(()=>{
                    this.setState({rotate:new Animated.Value(1)})
                });break;
        }
}
    render(){
        const shakeinput = [1,1.2,1.3,1.4,1.5]
        const shakeoutput = [ "0deg" , `${this.props.from_deg}deg`,"0deg",`${this.props.to_deg}deg`,"0deg"]
        const infiniteinput = [1,1.5]
        const infiniteoutput = ["0deg" , `${this.props.to_deg}deg`]  
        const comebackinput = [1,1.5]
        const comebackoutput = this.state.status == true ? ["0deg" , `${this.props.to_deg}deg`]  : [`${this.props.to_deg}deg`,"0deg"]
        const inter = this.state.rotate.interpolate({
            inputRange:this.props.type == "infinite" ? infiniteinput : this.props.type == "comeback" ? comebackinput : shakeinput, 
            outputRange: this.props.type == "infinite" ? infiniteoutput : this.props.type == "comeback" ? comebackoutput : shakeoutput 
        });
        const tras ={
            transform : [{
                rotate:inter
            }]
        }
        return(
            <AnimatedTouchable onPress={()=>this.render_animation()} 
                                style={this.props.style ? [this.props.style,tras] : [defaultStyle,tras]}
                                >
                {this.props.children}
            </AnimatedTouchable>
        );
    }
}
const defaultStyle={
    height : 100,
    width: 200 ,
    borderColor : "blue",
    borderWidth: 1
}

export default RotateButton;