import React, {Component} from 'react';

import {setFjoldi,addAfangi,deleteAfangi} from '../actions'; 
import CourseView from './courseView.js';

import {deepOrangeA400} from 'material-ui/styles/colors';
import {connect} from 'react-redux';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

import IconButton from 'material-ui/IconButton';

const styles = {
  main: {
    className: 'gluggar',
    marginLeft: '1%',
    marginRight: '1%',
    marginTop: '1%',
    borderStyle: 'solid',
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '1%',
    paddingBottom: '1%',
    borderWidth: '1px',
    borderRadius: '10px',
    width: '20%',
  },
  radioButton:  {
    color: deepOrangeA400
  },
  input: {
    paddingBottom: '2%',
    paddingRight: '5%',
    marginLeft: '30px',
    marginRight: 'auto',
    width: '20%'
  },
  container: {display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'flex-start', 
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '10px',
              width: '100%'
  },
  containerOuter: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around', 
  }
};

const fjoldatolur = [];
for (let i=1; i <=200; i++) {
  fjoldatolur.push(i);
}
const seasons = {'haust': 'Nemendafjöldi 1. nóvember', 
                  'vor': 'Nemendafjöldi 20. mars',
                  'sumar': 'Nemendafjöldi 15. júlí'}


class AboutCoursesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onn: props.onn
    }
  }
 
  componentWillReceiveProps(nextProps) {
    this.setState({onn: nextProps.onn});
  }

  componentWillMount() {
    this.setState({onn: this.props.onn});
  }
  breytaFjolda = (afangi,value,index) => {
    const {dispatch} = this.props;
    dispatch(setFjoldi(afangi,value,index));
  }
  
  addAfangi = () => {
    const {dispatch} = this.props;
    dispatch(addAfangi());
  }
  deleteAfangi = () => {
   const {dispatch} = this.props;
   dispatch(deleteAfangi()); 
  }
  render() {
    const {afangar} = this.props;
    return (
      <div style={styles.containerOuter}>
      {
        Object.keys(afangar).map((item)=>
          <CourseView key={item} 
                      onn={seasons[this.state.onn]} 
                      afangi={item} 
                      fjoldi={afangar[item]} 
                      breytaFjolda={this.breytaFjolda}
                      breytaEiningum={this.breytaEiningum}/>
        )
      }
       <div style={{width: '100%'}}>
              <IconButton  
                style={{marginRight: 20, float: 'right'}} 
                iconStyle={{color: deepOrangeA400}}
                onClick={this.addAfangi}
              >
                <ContentAdd />
              </IconButton>
              <IconButton 
                style={{marginRight: 0, float: 'right'}}
                iconStyle={{color: deepOrangeA400}} 
                onClick={this.deleteAfangi}
              >
                <ContentRemove/>
              </IconButton>
              </div>
      </div>

    );
  }
}

const mapStateToProps = (state)=> ({
    vinnumatA: state.vinnumatA,
    vinnumatC: state.vinnumatC,
    onn: state.onn,
    aldur: state.aldur,
    afangar: state.afangar
});

export default connect(mapStateToProps)(AboutCoursesView)