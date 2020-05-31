import React from 'react'
import {Animated,View} from 'react-native'

interface props {
    tension?:number,
}
interface state{
    animation:any
}
class ScaleIndicator extends React.Component<props,state>{
    constructor(props:props){
        super(props)
    }
    state:state={
        animation : new Animated.Value(1)
    }
    componentDidMount(){
        this.render_animation()
    }
    render_animation(){
        const {tension} = this.props;
        Animated.loop(
        Animated.stagger(1000,[
            Animated.spring(this.state.animation,{
                toValue:2,
                tension:tension ? tension : 200,
                useNativeDriver:true,
            }),
            Animated.spring(this.state.animation,{
                tension:tension ? tension : 200,
                useNativeDriver:true,
                toValue:3
            }),
            Animated.spring(this.state.animation,{
                tension:tension ? tension : 200,
                useNativeDriver:true,
                toValue:4
            }),
            Animated.spring(this.state.animation,{
                tension:tension ? tension : 200,
                useNativeDriver:true,
                toValue:5
            })
        ])
        ).start()
    }
    render(){
        const anim = {
            transform:[
                {
                    scale:this.state.animation
                }
            ]
        }
        return(
            <Animated.View style={[defaultStyle,anim]}>
                {this.props.children}
            </Animated.View>

        )
    }
}
const defaultStyle={
    height:20,
    width:20,
    borderRadius:40,
    backgroundColor:"green"
}
export default ScaleIndicator;