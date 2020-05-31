import React from 'react'
import {View,Animated} from 'react-native'



interface props{
    tension?:number,
    friction?:number,
    delay?:number,
    color?:Array<string>
}

interface state{
    animation:any,
}

class MultiplyIndicator extends React.Component<props,state>{

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
        Animated.loop(
        Animated.sequence([
            Animated.spring(this.state.animation,{
            toValue:1,
            tension:this.props.tension ? this.props.tension :40,
            friction:this.props.friction ? this.props.friction : 40,
            delay:this.props.delay ? this.props.delay/2 : 0,
            useNativeDriver:true
        }),
        Animated.spring(this.state.animation,{
            toValue:0,
            tension:this.props.tension ? this.props.tension :40,
            friction:this.props.friction ? this.props.friction : 40,
            delay:this.props.delay ? this.props.delay/2 : 0,
            useNativeDriver:true
        })
    ])
        ).start();
    }

    render(){
        const inp=[0,0.5,1];
        const out=[0,-25,-50];

        const inp_two=[0,0.5,1];
        const out_two=[0,25,50];


        const inter=this.state.animation.interpolate({
            inputRange:inp,
            outputRange:out
        });

        const inter_two=this.state.animation.interpolate({
            inputRange:inp_two,
            outputRange:out_two
        });

        const anim={
            transform:[
                {translateX:inter},
                
            ]
        }

        const anim_two={
            transform:[
                {translateX:inter_two}
            ]
        }

        return(            
        <View style={{position:"absolute"}}>
            <Animated.View style={[defaultStyle,{position:"absolute",backgroundColor:this.props.color? this.props.color[0] : "green"}]} />
            <Animated.View style={[defaultStyle,anim_two,{position:"absolute",backgroundColor:this.props.color? this.props.color[1] : "blue"}]} />
            <Animated.View style={[defaultStyle,anim,{position:"absolute",backgroundColor:this.props.color? this.props.color[2] : "yellow"}]} />
        </View>
            

        )
    }


}

const defaultStyle={
    height:20,
    width:20,
    borderRadius:40,
    //backgroundColor:"green"
}

export default MultiplyIndicator;