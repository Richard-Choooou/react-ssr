import * as React from 'react'
import { Store } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import fetch from '@src/api'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Swiper from 'swiper'
import './index.scss'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { goodsData, newGoods} from './data'

interface componentProp extends WithStyles<typeof styles> {
    recommendGoods: Array<any>
    setRecommendGoods(Array): void
}

interface componentState {
    imgUrls: Array<string>,
    classifications: Array<any>
}

function getClassificationsData() {
    return Promise.resolve(goodsData)
}

function getNewCreateGoods() {
    return Promise.resolve(newGoods)
}

class Index extends React.Component<componentProp & RouteComponentProps, componentState> {
    private swiper: Swiper
    private swiperWrapper: React.RefObject<HTMLDivElement>
    constructor(prop: componentProp & RouteComponentProps) {
        super(prop)
        this.state = {
            imgUrls: [
                'https://img.alicdn.com/tfs/TB1zbrItmzqK1RjSZFHXXb3CpXa-520-280.jpg_q90_.webp',
                'https://img.alicdn.com/tfs/TB1RkoItAvoK1RjSZFDXXXY3pXa-520-280.jpg_q90_.webp',
                'https://img.alicdn.com/simba/img/TB10dz3xiMnBKNjSZFoSuvOSFXa.jpg',
                'https://img.alicdn.com/simba/img/TB1AiHVXjDpK1RjSZFrSuu78VXa.jpg'
            ],
            classifications: []
        }
        this.swiperWrapper = React.createRef<HTMLDivElement>()
    }

    static getAsyncData(store: Store) {
        return Promise.all([getNewCreateGoods(), getClassificationsData()]).then(([newGoods, classificationData]) => {
            // console.log(newGoodxs, classificationData)
            classificationData.unshift({
                id: -1,
                name: '上新',
                products: newGoods
            })
            store.dispatch({
                type: 'SET_RECOMMEND_GOODS',
                value: classificationData
            })
        })
    }

    componentDidMount() {
        this.swiper = new Swiper(this.swiperWrapper.current, {
            loop: true,
        })

        if (this.props.recommendGoods.length === 0) {
            return Promise.all([getNewCreateGoods(), getClassificationsData()]).then(([newGoods, classificationData]) => {
                console.log(newGoods, classificationData)
                classificationData.unshift({
                    id: -1,
                    name: '上新',
                    products: newGoods
                })
                this.props.setRecommendGoods(classificationData)
            })
        }
    }

    private goToGoodsDetail(id) {
        this.props.history.push('/app/goodsDetail/' + id)
    }

    render() {
        const { classes } = this.props
        
        return (
            <div className="index-container">
                <div className={classes.swiperContainer} ref={this.swiperWrapper}>
                    <div className={classes.swiperWrapper + ' swiper-wrapper'}>
                        {this.state.imgUrls.map((url, index) => <img className={this.props.classes.swiperItem + ' swiper-slide'} key={index} src={url} />)}
                    </div>
                </div>
                {this.props.recommendGoods.map((value, index) => <section key={index} className="class-container">
                    <h2>
                        <i className="line"></i>
                        <span className="title">{value.name}</span>
                    </h2>
                    <div className="goods-container">
                        {value.products.map((goods, kIndex) => <Card key={kIndex} onClick={() => this.goToGoodsDetail(goods.id)} className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                className={classes.cardImage}
                                component="img"
                                image={goods.thumbnail}
                                title="Contemplative Reptile"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography className={classes.goodsName} gutterBottom variant="h5" component="h3">
                                        {goods.name}
                                    </Typography>
                                    <Typography className={classes.goodsPrice} variant="body2" color="textSecondary" component="p">
                                        ￥{goods.price}
                                    </Typography>
                                    {/* <i className={classes.addCartBtn + " iconfont iconfont-cartplus"}></i> */}
                                </CardContent>
                            </CardActionArea>
                            {/* <CardActions>
                                
                            </CardActions> */}
                        </Card>)}
                    </div>
                </section>)}
            </div>
        )
    }
}

const styles = createStyles({
    swiperContainer: {
        width: '100%',
        height: '200px',
        overflow: 'hidden'
    },

    swiperWrapper: {
        display: 'flex',
        height: '100%'
    },

    swiperItem: {
        width: "100%"
    },

    card: {
        position: 'relative'
    },

    cardImage: {
        width: '100%',
        height: '140px',
    },

    cardContent: {
        padding: '8px',
    },

    goodsName: {
        fontSize: '16px',
        color: '#333'
    },

    goodsPrice: {
        fontSize: '14px',
        color: '#009688'
    },

    addCartBtn: {
        position: 'absolute',
        right: "8px",
        bottom: '8px',
        color: '#009688',
        fontSize: '24px'
    }
})

export default connect(state => {
    return {
        recommendGoods: state.indexPage.recommendGoods || []
    }
}, dispatch => {
    return {
        setRecommendGoods(list) {
            const action = {
                type: 'SET_RECOMMEND_GOODS',
                value: list
            }
            dispatch(action)
        }
    }
})(withStyles(styles)(Index))

