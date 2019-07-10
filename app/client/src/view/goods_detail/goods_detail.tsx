import * as React from 'react'
import './goods_detail.scss'
import { matchPath } from 'react-router'
// import fetch from '@src/api'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Swiper from 'swiper'
import data from './data'

function fetchAsyncData(id) {
    return Promise.resolve(data)
}

interface IProps extends WithStyles<typeof styles> {
    goodsDetail: any
    setGoodsDetail(Object: object): void
    clearStoreGoodsData(): void
}

class GoodsDetail extends React.Component<IProps & RouteComponentProps, null> {
    private swiperWrapper: React.RefObject<HTMLDivElement>
    private swiper: Swiper
    constructor(props) {
        super(props)
        this.swiperWrapper = React.createRef<HTMLDivElement>()
    }

    static getAsyncData(store, req) {
        const path = matchPath<{id: string}>(req.url, {
            path: "/app/goodsDetail/:id",
        })
        return fetchAsyncData(path.params.id).then(data => {
            store.dispatch({
                type: 'SET_GOODS_DETAIL',
                value: data
            })
        }).catch(e => {
            console.log(e)
        })
    }

    componentDidMount() {
        if (!this.props.goodsDetail.id) {
            fetchAsyncData(this.props.match.params.id).then(data => {
                this.props.setGoodsDetail(data)
                this.initSwiper()
            })
        } else {
            this.initSwiper()
        }
    }

    private initSwiper() {
        this.swiper = new Swiper(this.swiperWrapper.current, {
            loop: true,
        })
    }

    componentWillUnmount() {
        this.props.clearStoreGoodsData()
    }

    render() {
        const { classes } = this.props
        return (
            <div className="goods-detail-container">
                <div className={classes.swiperContainer} ref={this.swiperWrapper}>
                    <div className={classes.swiperWrapper + ' swiper-wrapper'}>
                        {this.props.goodsDetail.sliders && this.props.goodsDetail.sliders.map((item, index) => <img className={this.props.classes.swiperItem + ' swiper-slide'} key={index} src={item.url} />)}
                    </div>
                </div>
                <div className="goods-info">
                    <h1>{this.props.goodsDetail.name}</h1>
                    <p className="intro">{this.props.goodsDetail.intro}</p>
                    <p className="price">¥{this.props.goodsDetail.price}</p>
                </div>
                <div>
                    <div className="rich-content-container" dangerouslySetInnerHTML={{
                        __html: this.props.goodsDetail.description
                    }}>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = createStyles({
    swiperContainer: {
        width: '100%',
        height: '300px',
        overflow: 'hidden'
    },

    swiperWrapper: {
        display: 'flex',
        height: '100%'
    },

    swiperItem: {
        width: "100%"
    }
})

const component = connect(state => {
    return {
        goodsDetail: state.goodsDetailPage.goodsData
    }
}, dispatch => {
    return {
        setGoodsDetail(value) {
            dispatch({
                type: 'SET_GOODS_DETAIL',
                value: value
            })
        },

        clearStoreGoodsData() {
            dispatch({
                type: 'CLEAR_GOODS_DETAIL'
            })
        }
    }
})(withStyles(styles, {})(GoodsDetail))

export default component