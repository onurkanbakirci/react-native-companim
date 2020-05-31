import React from 'react'
import {View,Animated} from 'react-native'

interface props{
    style?:object,
    duration?:number,
    delay?:number
}
interface state{
    animation:any,
}

class RotateIndicator extends React.Component<props,state>{
    
    constructor(props:props){
        super(props);
    }
    state:state={
        animation:new Animated.Value(0),
    }

    componentDidMount(){
        this.render_animation()
    }

    render_animation(){
        const {duration,delay} = this.props;
        Animated.loop(
        Animated.timing(this.state.animation,{
            toValue:1,
            duration:duration ? duration :1000,
            useNativeDriver:true,
            delay:delay ? delay : 0,
        })
        ).start()
    }
    render(){
        const inp = [0,1];
        const out=["0deg","360deg"]
        const inter =this.state.animation.interpolate({
            inputRange:inp,
            outputRange:out
        })
 
        const anim = {
            transform:[
                {rotate:inter},
            ]
        }
        return(
            <Animated.View style={this.props.style ? [ this.props.style ,anim] : [defaultStyle,anim]} >

            </Animated.View>
        )
    }
}
const defaultStyle={
    height:50,
    width:50,
    backgroundColor:"green"
}
export default RotateIndicator;