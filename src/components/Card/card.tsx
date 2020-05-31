import React from 'react'
import {View, Text,Animated,Image,Dimensions,ImageStyle,ViewStyle} from 'react-native'

const {width,height} = Dimensions.get("window");
const widthWithMargin = width -20

interface props {
    //cardStyle?:object,
    sequentially?:number,
    titleStyle?:object,
    middleTitleStyle? :object,
    subTitleStyle?:object,
    endTitleStyle?:object,
    animationType ?:string
    title?  : string,
    subtitle ?: string,
    tension ? : number,
    image?:any,
    middleTitle ? :string,
    endTitle?:string,
}
interface stateinterf {
    animation :any,
    opacity:any,
    value:number
}

class Card extends React.Component<props,stateinterf>{
    state :stateinterf;
    constructor(props:props){
        super(props);
        this.state ={
            value:500,
            animation : new Animated.Value(0),
            opacity : new Animated.Value(0),
        }
    }

    componentDidMount(){
        this.render_animation();
    }
    async render_animation(){
        const {sequentially,tension} = this.props;
        var x=sequentially ? (sequentially)*100 : 0;
        switch(this.props.animationType){
            case "leftToRight" :
                Animated.spring(this.state.animation,{
                    toValue:1,
                    delay : sequentially == 0 ? 100 : x,
                    useNativeDriver:true,
                    tension:tension? tension : 20
                }).start()
                break;
            case "opacity":
                Animated.timing(this.state.opacity,{
                    toValue:1,
                    duration:1000,
                    delay:sequentially == 0 ? 100 : x,
                    useNativeDriver:true
                }).start()
                break;
            case "bothLeftToRightOpacity":
                Animated.parallel([
                    Animated.spring(this.state.animation,{
                        toValue:1,
                        delay:sequentially == 0 ? 100 : x,
                        useNativeDriver:true,
                        tension:tension? tension : 20
                    }),Animated.timing(this.state.opacity,{
                        toValue:1,
                        delay:sequentially == 0 ? 100 : x,
                        duration:1000,
                        useNativeDriver:true
                    })
            ]).start()
            break;
            case "bytheZaxis":
                Animated.parallel([
                    Animated.spring(this.state.animation,{
                        toValue:1,
                        delay:sequentially == 0 ? 100 : x,
                        useNativeDriver:true,
                        tension:tension? tension : 20
                    }),Animated.timing(this.state.opacity,{
                        toValue:1,
                        delay:sequentially == 0 ? 100 : x,
                        duration:1000,
                        useNativeDriver:true
                    })
            ]).start()
            break;
            case "bytheXaxis":
                Animated.parallel([
                    Animated.spring(this.state.animation,{
                        toValue:1,
                        delay:sequentially == 0 ? 100 : x,
                        useNativeDriver:true,
                        tension:tension? tension : 20
                    }),Animated.timing(this.state.opacity,{
                        toValue:1,
                        delay:sequentially == 0 ? 100 : x,
                        duration:500,
                        useNativeDriver:true
                    })
            ]).start()
            break;
            case "bytheYaxis":
                Animated.parallel([
                    Animated.spring(this.state.animation,{
                        toValue:1,
                        delay:sequentially == 0 ? 100 : x,
                        useNativeDriver:true,
                        tension:tension? tension : 20
                    }),Animated.timing(this.state.opacity,{
                        toValue:1,
                        delay:sequentially == 0 ? 100 : x,
                        duration:1000,
                        useNativeDriver:true
                    })
            ]).start()
            break;
            default:
                Animated.parallel([
                    Animated.spring(this.state.animation,{
                        toValue:1,
                        delay :sequentially == 0 ? 100 : x,
                        useNativeDriver:true,
                        tension:tension? tension : 20
                    }),Animated.timing(this.state.opacity,{
                        toValue:1,
                        delay:sequentially == 0 ? 100 : x,
                        duration:1000,
                        useNativeDriver:true
                    })
            ]).start()
        }
    }
    render(){
        const {animationType,image,titleStyle,subTitleStyle,title,
                subtitle,middleTitleStyle,middleTitle,endTitle,endTitleStyle} = this.props;
        const inter = this.state.animation.interpolate({
            inputRange:[0,1],
            outputRange:[-500,0]
        })
        const rot = this.state.animation.interpolate({
            inputRange:[0,1],
            outputRange:["-60deg","0deg"],
            extrapolate:"clamp"
        })
        const animations={
            transform:[
                {translateX:animationType == "opacity" || animationType=="bytheZaxis" ||  animationType=="bytheXaxis"?  this.state.animation  :inter },
                {rotateZ:animationType == "bytheZaxis" ? rot : "0deg"},
                {rotateY:animationType == "bytheYaxis" ? rot : "0deg"},
                {rotateX:animationType == "bytheXaxis" ? rot : "0deg"},
            ],
            opacity:animationType =="opacity"  || animationType=="bothLeftToRightOpacity" || animationType=="bytheZaxis"  ||  animationType=="bytheXaxis" ? this.state.opacity  : null
        }
        return(
            <Animated.View style={[defaultStyle.card,animations]}>
                <View  style={{flexDirection:"row"}}>
                    <Image style={defaultStyle.imgStyle as ImageStyle} source={image}/>
                    <View style={defaultStyle.titlesSection}>
                        <Text style ={titleStyle? titleStyle :defaultStyle.title}>{title}</Text>
                        <Text style={subTitleStyle? subTitleStyle :defaultStyle.subTitle}>{subtitle}</Text>
                    </View>
                    <View style={defaultStyle.middleSection as ViewStyle}>
                        <Text style={middleTitleStyle? middleTitleStyle : defaultStyle.middleSectionText}>{middleTitle}</Text>
                    </View>
                    <View style={defaultStyle.endSection as ViewStyle}>
                        <Text style={endTitleStyle? endTitleStyle :  defaultStyle.endSectionText}>{endTitle}</Text>
                    </View>
                </View>
            </Animated.View>
        );
    }
}

const defaultStyle =  {
    card:{
        marginVertical:5,
        backgroundColor:"white",
        borderRadius:5,
        height:50,
        width:widthWithMargin,
        justifyContent:"center",
        elevation:10
    },
    imgStyle:{
        marginHorizontal:10,
        backgroundColor:"black",
        resizeMode:"cover",
        height:40,
        width:40,
        borderRadius:80
    },
    titlesSection:{
        width: 3*(widthWithMargin-60)/8,
    },
    title:{
        fontSize:15,
        color:"black"
    },
    subTitle:{
        fontSize:10
    },
    middleSection:{
        width:3*(widthWithMargin-60)/8,
        alignItems:"center",
        justifyContent:"center"
    },
    middleSectionText:{
        textAlign:"center",
        fontSize:10
    },
    endSection:{
        width:2*(widthWithMargin-60)/8,
        justifyContent:"center",
        alignItems:"center"
    },
    endSectionText:{
        textAlign:"center",
        fontSize:10
    }
}

export default Card;