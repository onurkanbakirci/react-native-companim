import React from 'react'
import {View,Animated} from 'react-native'

interface props{
    tension?:number,
    style?:object
}

interface state{
    animation: any,
}

class SuddenIndicator extends React.Component<props,state>{
        constructor(props:props){
            super(props)
        }
        state:state={
            animation:new Animated.Value(0),
        }
        componentDidMount(){
            this.render_animation()           
        }
        render_animation(){

            const {tension} = this.props;
            Animated.loop(
            Animated.sequence([
            Animated.spring(this.state.animation,{
                toValue:1,
                useNativeDriver:true,
                tension:tension ? tension : 90
            }),
            Animated.spring(this.state.animation,{
                toValue:0,
                useNativeDriver:true,
                tension:tension ? tension : 90
            }),
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
            const {style} = this.props;
            return(
                <Animated.View style={ style? [style,anim] : [defaultStyle,anim]}>
                    {this.props.children}
                </Animated.View>
            )
        }
}
const defaultStyle={
    height:40,
    width:40,
    borderRadius:80,
    position:"absolute",
    backgroundColor:"green"
}
export default SuddenIndicator;