import React from 'react'
import {View,Animated} from 'react-native'



interface props{
    duration?:number,
    delay?:number,
    color?:Array<string>
}

interface state{
    animation:any,
    seqAnim:any,
    thAnim:any
}

class CircleIndicator extends React.Component<props,state>{

    constructor(props:props){
        super(props)
        
    }

    state:state={
        animation:new Animated.Value(0),
        seqAnim:new Animated.Value(0),
        thAnim:new Animated.Value(0)
    }
  

    componentDidMount(){
           this.render_animation();
        }

    render_animation(){

        Animated.loop(
            
                Animated.timing(this.state.animation,{
                    toValue:1,
                    useNativeDriver:true,
                    duration:this.props.duration ? this.props.duration : 2000,
                    delay:this.props.delay ? this.props.delay : 0
               }),
               
        ).start();
    }

    render(){
        const inp= [0,1];
        const out=["0deg","360deg"]

        const inter   = this.state.animation.interpolate({
            inputRange:inp,
            outputRange:out
        })
        const anim = {
            transform:[
                {
                    rotate:inter
                }
            ]
        }
        return(            
        <Animated.View style={[anim,{position:"absolute",height:50,width:50}]}>
             <Animated.View style={[defaultStyle,{position:"absolute",backgroundColor:this.props.color? this.props.color[0] : "gray"}]} />
                <Animated.View style={[anim,{position:"absolute",height:50,width:50}]} >
                    <Animated.View style={[defaultStyle,{position:"absolute",backgroundColor:this.props.color? this.props.color[1] : "blue"}]} />
                    <Animated.View style={[anim,{position:"absolute",height:50,width:50}]} >
                        <Animated.View style={[defaultStyle,{position:"absolute",backgroundColor:this.props.color? this.props.color[2] : "yellow"}]} />  
                            <Animated.View style={[anim,{position:"absolute",height:50,width:50}]} >
                        <Animated.View style={[defaultStyle,{position:"absolute",backgroundColor:this.props.color? this.props.color[3] : "green"}]} />  
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        </Animated.View>

        )
    }
}

const defaultStyle={
    height:15,
    width:15,
    borderRadius:30,
    //backgroundColor:"green"
}

export default CircleIndicator;