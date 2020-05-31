import React from 'react'
import {TouchableOpacity,Animated} from 'react-native'

interface props {
    animationType ?:string,
    style ?:any,
    duration?:number
}

interface state {
    animation:any,
    toggle:boolean
}

class ScaleButton extends React.Component<props,state>{
    constructor(props:props){
        super(props)
    }
    state:state={
        animation : new Animated.Value(1),
        toggle:true
    }
    render_animation(){
        Animated.timing(this.state.animation,{
            toValue:this.state.toggle? 1.5 : 1,
            duration:this.props.duration?this.props.duration : 1000,
            useNativeDriver:true
        }).start(()=>this.setState({toggle:!this.state.toggle}))
}
    render(){
        const anim = {
            transform:[
                {scaleX:this.props.animationType == "byTheXaxis" || this.props.animationType == "bothXYaxis"   ?  this.state.animation : this.state.animation},
                {scaleY:this.props.animationType == "byTheYaxis" || this.props.animationType == "bothXYaxis" ?this.state.animation : 1}
            ]
        }
        return(
            <TouchableOpacity 
                onPress={()=>this.render_animation()}
                style={this.props.style? [this.props.style,anim] : [defaultStyle,anim]}>
                    {this.props.children}
            </TouchableOpacity>
        )
    }
}
const defaultStyle={
    height:100,
    width:100,
    borderRadius:200,
    backgroundColor:"green"
}

export default ScaleButton;