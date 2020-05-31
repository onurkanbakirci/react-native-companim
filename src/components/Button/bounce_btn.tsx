import React from 'react';
import {TouchableOpacity,Animated,StyleSheet} from 'react-native';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface state {
    scale: any,
}
interface props {
    duration ?: number,
    direction ?: boolean,
    friction ?:boolean,
    delay ?:number,
    style ? : any
}

class BounceButton extends React.Component<props,state>{

    constructor(props:props) {
        super(props)
    }
    state:state={
        scale : new Animated.Value(1),
    }
    render_animation(){
        Animated.timing(this.state.scale,{
            toValue:1.5,
            duration: this.props.duration? this.props.duration :500,
            useNativeDriver:true,
            delay : this.props.delay ? this.props.delay : 0
        }).start(()=>{
            this.setState({scale:new Animated.Value(1)})
        })
    }
    render (){
        const input = [
            1,1.2,1.5
        ]
        const output =this.props.direction == true ? [
            1,1.2,1
        ]:
        [  
            1,0.8,1
        ] 
        const frictioninput=[
            1,1.2,1.3,1.4,1.5
        ] 
        const frictionoutput= this.props.direction == false ? [
            1,1.2,1.1,1.2,1
        ] : [1,0.8,1,0.8,1]
        const inter = this.state.scale.interpolate({
            inputRange:this.props.friction == true ? frictioninput : input,
            outputRange:this.props.friction == true ? frictionoutput : output
        })
        const tras ={
            transform : [{
                scale:inter
            }]
        }
        return(
            <AnimatedTouchable style={this.props.style? [this.props.style,tras] : [default_style,tras] } 
                                onPress={()=>this.render_animation()} 
                                >
                {this.props.children}
            </AnimatedTouchable>
        )
    }
}

const default_style={
    height : 100,
    width: 200 ,
    //borderRadius:200,
    borderColor : "blue",
    borderWidth: 1
}


export default BounceButton;