import React, {Component} from 'react';

//import ToggleView from './toggleView.js';
import {setVinnumatA, setVinnumatC, setOnn, setAldur} from '../actions'; 

import {grey900,deepOrangeA400} from 'material-ui/styles/colors';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FontIcon from 'material-ui/FontIcon';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

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
      onn: props.onn
    }
  }

  changeAldur = (event,index,value) => {
    const {dispatch} = this.props;
    dispatch(setAldur(value));
  };

  changeOnn = (event,value) =>  {
    const {dispatch} = this.props;
    console.log(value)
    dispatch(setOnn(value));
  }
  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  componentWillMount() {
    this.setState({aldur: this.props.aldur, 
                    vinnumatA: this.props.vinnumatA, 
                    vinnumatC: this.props.vinnumatC, 
                    onn: this.props.onn});
  }


  render() {
    const {onn,vinnumatA,vinnumatC,aldur} = this.props;
    console.log('önn',onn);
    return (
      <div>
        
        <div style={{display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start'}}
        >
          <div>
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
          <div>
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
              
            </RadioButtonGroup>
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