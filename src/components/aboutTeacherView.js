import React, {Component} from 'react';

import {setVinnumatA, setVinnumatC, setOnn, setAldur} from '../actions'; 

import {grey900,deepOrangeA400} from 'material-ui/styles/colors';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FontIcon from 'material-ui/FontIcon';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import TextField from 'material-ui/TextField';

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
    width: '25%',
  },
  radioButton:  {
    color: deepOrangeA400
  },
  input: {
    paddingBottom: '2%',
    paddingRight: '5%',
    marginLeft: '30px',
    marginRight: 'auto',
    width: '40%'
  },
  container: {display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              justifyContent: 'flex-start', 
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '10px',
              width: '40%'
  },
  containerOuter: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around', 
  }
};
const ages = ["30 ára-","30-37 ára","38-54 ára","55-60 ára","60 ára+"];


class AboutTeacherView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aldur: props.aldur,
      vinnumatA: props.vinnumatA,
      vinnumatC: props.vinnumatC,
      onn: props.onn,
      errorA: '',
      errorC: ''
    }
  }

  changeAldur = (event,index,value) => {
    const {dispatch} = this.props;
    dispatch(setAldur(value));
  };

  changeOnn = (event,value) =>  {
    const {dispatch} = this.props;
    dispatch(setOnn(value));
  }

  handleChangeA = (event) => { 
    this.setState({errorA: (isNaN(event.target.value.replace(',','.')) || event.target.value.trim() === '')? 'Verður að hafa tölu': ''
    });
    const {dispatch} = this.props;
    dispatch(setVinnumatA(event.target.value));
  };

  handleChangeC = (event) => { 
    this.setState({errorC: (isNaN(event.target.value.replace(',','.')) || event.target.value.trim() === '')? 'Verður að hafa tölu': ''
    });
    const {dispatch} = this.props;
    dispatch(setVinnumatC(event.target.value));
  };
  componentWillReceiveProps(nextProps) {
    this.setState({aldur: nextProps.aldur,
                    errorA: '', 
                    vinnumatA: nextProps.vinnumatA, 
                    vinnumatC: nextProps.vinnumatC, 
                    onn: nextProps.onn, errorA: '', errorC: ''});
  }

  componentWillMount() {
    this.setState({aldur: this.props.aldur,
                    errorA: '', 
                    vinnumatA: this.props.vinnumatA, 
                    vinnumatC: this.props.vinnumatC, 
                    onn: this.props.onn});
  }


  render() {
    const {onn,vinnumatA,vinnumatC,aldur} = this.props;
    return (
      <div style={styles.containerOuter}>   
        <div style={styles.container}>
          <div style={styles.input}>
            <h5 style={{padding: '0%',marginLeft: '0%', marginBottom: '1%', color: deepOrangeA400, fontWeight: 'normal'}}>Önn</h5>
            <RadioButtonGroup name="Onn" defaultSelected={this.state.onn} onChange={this.changeOnn}>
              <RadioButton
                value="vor"
                label="Vor"
              />
              <RadioButton
                value="haust"
                label="Haust"
                style={styles.radioButton}
              />
              <RadioButton
                value="sumar"
                label="Sumar"
                style={styles.radioButton}
              />
              
            </RadioButtonGroup>
          </div>
          <div style={styles.input}>
            <SelectField
              floatingLabelText="Aldur"
              floatingLabelStyle={{color: deepOrangeA400}}
              value={this.state.aldur}
              onChange={this.changeAldur}
              underlineFocusStyle={{borderColor: deepOrangeA400}}
              selectedMenuItemStyle={{color: deepOrangeA400}}
            >
            {
              ages.map((item)=> <MenuItem key={item} value={item} primaryText={item} />)
            }
            </SelectField>
          </div>
          
        </div>
        <div style={styles.container}>
          <div style={styles.input}>
            <TextField
              value={this.state.vinnumatA}
              floatingLabelText="Vinnumat A-hluta"
              floatingLabelStyle={{color: deepOrangeA400}}
              underlineFocusStyle={{borderColor: deepOrangeA400}}
              onChange={this.handleChangeA}
              errorText={this.state.errorA}
            />
          </div>
          <div style={styles.input}>
            <TextField
              value={this.state.vinnumatC}
              floatingLabelText="Vinnumat C-hluta"
              floatingLabelStyle={{color: deepOrangeA400}}
              underlineFocusStyle={{borderColor: deepOrangeA400}}
              onChange={this.handleChangeC}
              errorText={this.state.errorC}
            />
          </div>        
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
    
});

export default connect(mapStateToProps)(AboutTeacherView)