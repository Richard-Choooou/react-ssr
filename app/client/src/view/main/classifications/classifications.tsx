import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import fetch from '@src/api'
import './classifications.scss'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import data from './data'

interface IProps extends WithStyles<typeof styles> {
    classifications: Array<any>
    setClassificationsData(Array): void
}

interface IStates {
    activeClassId: number
}

class Classifications extends React.Component<IProps & RouteComponentProps, IStates> {
    // private scrollContainer: React.RefObject<HTMLElement>

    constructor(props) {
        super(props)
        // this.scrollContainer = React.createRef<HTMLElement>()
        this.state = {
            activeClassId: 0
        }
    }

    static getAsyncData(store) {
        return Promise.resolve(data).then(data => {
            store.dispatch({
                type: 'SET_CLASSIFICATIONS_DATA',
                value: data
            })
        }).catch(e => {

        })
    }

    componentDidMount() {
        if (this.props.classifications.length === 0) {
            this.getClassificationsData()
        } else {
            this.setState({
                activeClassId: this.props.classifications[0].id
            })
        }
    }

    private getClassificationsData() {
        Promise.resolve(data).then(data => {
            this.props.setClassificationsData(data)
            if (data.length > 0) {
                this.setState({
                    activeClassId: data[0].id
                })
            }
        }).catch(e => {
            
        })
    }

    private onRightScroll(event: Event) {
        this.props.classifications.forEach((value, index) => {
            const rect = (this.refs['classTitle' + value.id] as any).getBoundingClientRect()
            if (rect.top === 0) {
                this.setState({
                    activeClassId: value.id
                })
                return
            }
        })
    }

    private activeClass(value) {
        this.setState({
            activeClassId: value.id
        })

        setTimeout(() => {
            this.setState({
                activeClassId: value.id
            })
        }, 20)

        ;(this.refs['scroll-tag' + value.id] as any).scrollIntoView()
    }

    private goToGoodsDetail(id) {
        window.open(window.location.origin + '/app/goodsDetail/' + id)
    }

    render() {
        const { classes } = this.props
        return (
            <div className="classifications-container">
                <div className="left">
                    <ul>
                    {this.props.classifications.map((value, index) => 
                        <li className={this.state.activeClassId === value.id? 'active' : ''} onClick={() => this.activeClass(value)} key={index}>
                            {value.name}
                        </li>)}
                    </ul>
                </div>
                <div className="right">
                    <div className="scroll-container" onScroll={e => this.onRightScroll(e)}>
                        {this.props.classifications.map((item, index) =>
                        <div className="class-wrapper" key={index}>
                            <h2 ref={'classTitle' + item.id}>
                                <i className="line"></i>
                                {item.name}
                            </h2>
                            <i className="scroll-tag" ref={'scroll-tag' + item.id}></i>
                            {item.products.map((goods, index) => 
                                <Card key={index} onClick={() => this.goToGoodsDetail(goods.id)} className={classes.goodsItem}>
                                    <CardActionArea className={classes.cardArea}>
                                        <CardMedia
                                            className={classes.thumbnail}
                                            component="img"
                                            image={goods.thumbnail}
                                        />
                                        <CardContent className={classes.cardConent}>
                                            <Typography component="p" className={classes.goodsName}>
                                                {goods.name}
                                            </Typography>
                                            <Typography component="p" className={classes.goodsIntro}>
                                                {goods.intro}
                                            </Typography>
                                            <Typography component="p" className={classes.goodsPrice}>
                                                ¥{goods.price}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )}
                        </div>)}
                    </div>
                </div>
            </div>
        )
    }
}

const styles = createStyles({
    goodsItem: {
        display: 'flex',
        margin: '8px',
    },

    cardArea: {
        display: 'flex',
        justifyContent: "normal",
        padding: '8px'
    },

    cardConent: {
        marginLeft: '8px',
        padding: 0,
    },

    goodsName: {
        fontSize: '16px',
        color: "#333",
    },

    goodsIntro: {
        fontSize: '14px',
        color: "#666",
    },

    goodsPrice: {
        marginTop: '4px',
        fontSize: '14px',
        color: '#009688'
    },

    thumbnail: {
        width: '80px',
        height: '80px',
        borderRadius: '4px'
    }
})

const Component = connect(state => {
    return {
        classifications: state.classificationsPage.classifications || []
    }
}, dispatch => {
    return {
        setClassificationsData(list) {
            const action = {
                type: 'SET_CLASSIFICATIONS_DATA',
                value: list
            }
            dispatch(action)
        }
    }
})(withStyles(styles)(Classifications))

export default Component