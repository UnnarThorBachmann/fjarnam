import React, {Component} from 'react';

import {setVinnumatA, setVinnumatC, setOnn, setAldur} from '../actions'; 
import CourseView from './courseView.js';

import {grey900,deepOrangeA400} from 'material-ui/styles/colors';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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

  change0 = (event, index, value) => this.setState({fjoldiByrjun: value});
  change1 = (event, index, value) => this.setState({fjoldiNov: value});
  change2 = (event, index, value) => this.setState({fjoldiLokaprof: value});

 
  componentWillReceiveProps(nextProps) {
    this.setState({onn: nextProps.onn});
  }

  componentWillMount() {
    this.setState({onn: this.props.onn});
  }


  render() {
    const {onn,vinnumatA,vinnumatC,aldur} = this.props;
    
    return (
      <div style={styles.containerOuter}>   
        <CourseView onn={seasons[this.state.onn]}/>
      </div>

    );
  }
}

const mapStateToProps = (state)=> ({
    vinnumatA: state.vinnumatA,
    vinnumatC: state.vinnumatC,
    onn: state.onn,
    aldur: state.aldur,
    
});

export default connect(mapStateToProps)(AboutCoursesView)