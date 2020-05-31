import React from 'react'
import {Animated,View, TouchableWithoutFeedback, TouchableOpacity} from "react-native";


const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);


interface props{
    firstButtonChilds?:object,
    middleButtonChilds?:object,
    lastButtonChilds?:object,
    middleButtonPixel?:number,
    lastButtonPixel?:number,
    direction?:string,
    firstButtonStyle?:object,
    middleButtonStyle?:object,
    lastButtonStyle?:object,
    tension?:number,
    friction?:number,
    delay?:number,
    iconName?:string,
    iconSize?:string,
    iconColor?:string
}
interface state{
    animation:any,
    status:boolean
}

class MultiplyButton extends React.Component<props,state>{
    constructor(props:props){
        super(props)
    }
    state:state={
        animation : new Animated.Value(0),
        status:true
    }
     render_animation(){
        const toValue = this.state.status ? 1 : 0;
        Animated.spring(this.state.animation,{
            toValue,
            tension:this.props.tension ? this.props.tension : 40,
            friction:this.props.friction ? this.props.friction : 40,
            delay:this.props.delay ? this.props.delay : 0,
            useNativeDriver:true
        }).start();
         this.setState({status:!this.state.status});
    }

    render(){
        const inp= [0,1];
        const out=[0,this.props.middleButtonPixel  ? this.props.middleButtonPixel : -50] ;
        const out_second=[0,this.props.lastButtonPixel  ? this.props.lastButtonPixel : -100] ;
        const inter = this.state.animation.interpolate({
            inputRange:inp,
            outputRange:out
        })
        const inter_second = this.state.animation.interpolate({
            inputRange:inp,
            outputRange:out_second
        })
        const anim = {
            transform:[
                {translateX:this.props.direction == "x" ? inter : this.props.direction == "y" ? 0 : inter},
                {translateY:this.props.direction == "y" ? inter :  0}
            ]
        }
        const anim_second = {
            transform:[
                {translateX: this.props.direction == "x" ? inter_second : this.props.direction == "y" ? 0 : inter_second},
                {translateY:this.props.direction == "y" ?  inter_second : 0}
            ]
        }
    
        return(
            <View style={{position:"absolute"}}>
                <AnimatedTouchable  
                                    style={this.props.lastButtonStyle?[this.props.lastButtonStyle,anim_second,{position:"absolute"}] : 
                                    [defaultStyle,anim_second,{backgroundColor:"red"}]}>
                                        {this.props.lastButtonChilds}
                                        
                </AnimatedTouchable>
                <AnimatedTouchable  
                                    style={this.props.middleButtonStyle? [this.props.middleButtonStyle,anim,{position:"absolute"}]:
                                    [defaultStyle,anim,{backgroundColor:"blue"}]}>
                                        {this.props.middleButtonChilds}
                </AnimatedTouchable>
                <AnimatedTouchable  onPress={()=>this.render_animation()}  
                                    style={this.props.firstButtonStyle? [this.props.firstButtonStyle,{ position:"absolute"}] : 
                                    [defaultStyle,{ backgroundColor:"green"}] }>
                                    {this.props.firstButtonChilds}
              </AnimatedTouchable>
            </View>
        )
    }

}

const defaultStyle={
   
    width:50,
    height:50,
    borderRadius:100,
    position:"absolute"
}

export default MultiplyButton;