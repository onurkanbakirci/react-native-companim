import React from 'react'
import {View,Animated} from 'react-native'

interface props{
    tension?:number,
    rightSecondaryStyle?:object
    rightFirstStyle?:object
    leftFirstStyle?:object
    leftSecondaryStyle?:object,
    middleStyle?:object
}

interface state{
    animation: any,
    seq_animation:any,
}

class SequentIndicator extends React.Component<props,state>{
        constructor(props:props){
            super(props)
        }
        state:state={
            animation:new Animated.Value(0),
            seq_animation:new Animated.Value(0),
        }
        componentDidMount(){
            this.render_animation()
           }
        render_animation(){
            const {tension} = this.props;
            Animated.loop(
            Animated.stagger(1000,[
                Animated.spring(this.state.animation,{
                    toValue:1,
                    tension:tension ? tension :40,
                    useNativeDriver:true
                }),
                Animated.spring(this.state.seq_animation,{
                    toValue:1,
                    tension:tension ? tension :40,
                    useNativeDriver:true
                }),
                Animated.spring(this.state.seq_animation,{
                    toValue:0,
                    tension:tension ? tension :40,
                    useNativeDriver:true
                }),
                Animated.spring(this.state.animation,{
                    toValue:0,
                    tension:tension ? tension :40,
                    useNativeDriver:true
                }),
            ])
            ).start()
        }
        render(){
            const inp=[0,1];

            const out=[0,50];

            const seq_out=[0,100];

            const neg_seq_out=[0,-100]

            const neg_out=[0,-50]

            const inter = this.state.animation.interpolate({
                inputRange:inp,
                outputRange:out
            })
            const seq_inter = this.state.seq_animation.interpolate({
                inputRange:inp,
                outputRange:seq_out
            })
            const neg_seq_inter = this.state.seq_animation.interpolate({
                inputRange:inp,
                outputRange:neg_seq_out
            })
            const neg_inter  = this.state.animation.interpolate({
                inputRange:inp,
                outputRange:neg_out
            })

            const anim={
                transform:[
                    {translateX:inter}
                ]
            }
            const seq_anim={
                transform:[
                    {translateX:seq_inter}
                ]
            }
            const neg_anim = {
                transform:[
                    {translateX:neg_inter}
                ]
            }
            const neg_seq_anim = {
                transform:[
                    {translateX:neg_seq_inter}
                ]
            }
            const {rightSecondaryStyle,rightFirstStyle,leftFirstStyle,leftSecondaryStyle,middleStyle} = this.props;
            return(
                <View style={{position:"absolute"}}>
                    <Animated.View style={ middleStyle ? middleStyle : [defaultStyle,{backgroundColor:"green"}]}/>
                    <Animated.View style={[ rightFirstStyle ? [rightFirstStyle,anim] : defaultStyle,anim,{backgroundColor:"blue"}]}/>
                    <Animated.View style={[ rightSecondaryStyle ? [rightSecondaryStyle,seq_anim] :defaultStyle,seq_anim,{backgroundColor:"yellow"}]}/>
                    <Animated.View style={[ leftFirstStyle ? [leftFirstStyle,neg_anim] : defaultStyle,neg_anim,{backgroundColor:"purple"}]}/>
                    <Animated.View style={[ leftSecondaryStyle ? [leftSecondaryStyle,neg_seq_anim] :defaultStyle,neg_seq_anim,{backgroundColor:"green"}]}/>
                </View>

            )
        }
}
const defaultStyle={
    height:20,
    width:20,
    borderRadius:40,
    position:"absolute",
}
export default SequentIndicator;