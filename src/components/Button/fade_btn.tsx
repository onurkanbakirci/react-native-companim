import React from 'react'
import {Button, StyleSheet,Animated, TouchableOpacity} from 'react-native';

interface props{
    duration ? : number,
    //opacity ?: number,
    //show_again?:boolean
    repeat?:boolean,
    gone ? :boolean,
    style ? :any
}
interface state {
    fade:any
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);


class FadeButton extends React.Component<props,state>{

    constructor(props:props){
        super(props)
    }
    state:state={
        fade :new Animated.Value(1)
    }
    render_animation(){
        if(this.props.repeat && this.props.gone!=true){
            const repetation = this.props.duration ? this.props.duration*2 : this.props.duration
            setInterval(()=>{
            Animated.sequence([
                Animated.timing(this.state.fade,{
                toValue:0,
                duration:this.props.duration,
                useNativeDriver:true
            }),
            Animated.timing(this.state.fade,{
                toValue:1,
                duration:this.props.duration,
                useNativeDriver:true
            })
        ]).start()
    },repetation)
    }else if(this.props.gone && this.props.repeat!=true){
            Animated.timing(this.state.fade,{
            toValue:0,
            duration:this.props.duration,
            useNativeDriver:true
        }).start()
    }
    else{
        Animated.sequence([
            Animated.timing(this.state.fade,{
            toValue:0,
            duration:this.props.duration ? this.props.duration/2: 500,
            useNativeDriver:true
        }),
        Animated.timing(this.state.fade,{
            toValue:1,
            duration:this.props.duration ? this.props.duration/2: 500,
            useNativeDriver:true
        })
    ]).start()
    }
    }
    render(){
        
        const opac = {
            opacity :this.state.fade
        }
        return(
            <AnimatedTouchable style={this.props.style? [this.props.style,opac] : [defaultStyle,opac] }  
                                onPress={()=>this.render_animation()}
                                >
                {this.props.children}
            </AnimatedTouchable>
        )
    }
}

const defaultStyle={
        height : 100,
        width: 200 ,
        borderColor : "blue",
        borderWidth: 2
}

export default FadeButton;