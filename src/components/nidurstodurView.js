import React, {Component} from 'react';

//import {setVinnumatA, setVinnumatC, setOnn, setAldur,setFjoldi,addAfangi,deleteAfangi} from '../actions'; 
import CourseView from './courseView.js';

import {grey900,deepOrangeA400} from 'material-ui/styles/colors';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {List, ListItem} from 'material-ui/List';

import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';

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



class Nidurstodur extends Component {
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
 
 vinnuskylda =(aldur)=>{
  switch(aldur) {
    case '30 ára-':
      return 720;
    case '30-37 ára':
      return 708;
    default:
      return 696;
    }
  }

  kennsluafslattur = (aldur)=> {
    switch(aldur) {
      case '55-60 ára':
        return (1/24*100);
      case '60 ára+':
        return 5/24*100;
      default:
        return 0;
    }
  }

  vinnuskyldaMedAfslaetti = (aldur,vinnumatC) => {
    const skylda = this.vinnuskylda(aldur);
    const afslattur = this.kennsluafslattur(aldur);
    if (skylda-vinnumatC <= 0)
      return skylda;
    else
      return vinnumatC + (skylda-vinnumatC)*(1-afslattur);
  }

  skuld = (aldur,vinnumatA,vinnumatC)=> {
    const skylda = this.vinnuskyldaMedAfslaetti(aldur,vinnumatC);
    if (vinnumatA + vinnumatC -skylda > 0)
      return 0;
    else
      return vinnumatA + vinnumatC -skylda;
  }

  starfshlutfall = (aldur,vinnumatA,vinnumatC) => {
    const skylda = this.vinnuskyldaMedAfslaetti(aldur,vinnumatC);
    console.log(skylda);
    return (vinnumatA+vinnumatC)/skylda*100;
  }

  talaToString = (tala,digit)=> {
    
    return tala?tala.toFixed(digit).toString().replace('.',','):0;
  }

  reiknaFjordunga = (onn, afangar, skuldin) => {
    let fjordungar = {};
    if (onn === 'sumar') {
      fjordungar = {...fjordungar, 'vikur': [6,6,6]}
    }
    else if (onn==='haust'){
     fjordungar = {...fjordungar, 'vikur': [4,4,6,4]} 
    }
    else {
     fjordungar = {...fjordungar, 'vikur': [4,4,4,2,4]}  
    }

    return fjordungar
  }

  render() {
    const {onn,vinnumatA,vinnumatC,aldur,afangar} = this.props;
    const vinnumatATala = parseFloat(vinnumatA);
    const vinnumatCTala = parseFloat(vinnumatC);
    const skuldin = onn==='sumar'?0:this.skuld(aldur,vinnumatATala,vinnumatCTala);
    const starfshlutfall= onn==='sumar'?100:this.starfshlutfall(aldur,vinnumatATala,vinnumatCTala);
    const vinnuskyldan = onn==='sumar'?0:this.vinnuskylda(aldur,vinnumatCTala);
    const vinnumatDagskola = vinnumatATala+vinnumatCTala;
    const fjordungar = this.reiknaFjordunga(onn, afangar,skuldin);

    return (
      <div>
        <List>
          <ListItem
            primaryText={`Starfshlutfall: ${this.talaToString(starfshlutfall,1)} %`}
          />
          <ListItem
            primaryText={`Vinnuskylda: ${vinnuskyldan} klst.`}
          />
          <ListItem
            primaryText={`Vinnumat dagskóla: ${this.talaToString(vinnumatDagskola,1)} klst.`}
          />
          <ListItem
            primaryText={`Skuld: ${this.talaToString(skuldin,1)} klst.`}
          />
        </List>
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

export default connect(mapStateToProps)(Nidurstodur)