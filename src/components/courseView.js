import React, {Component} from 'react';


import {deepOrangeA400} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {

  input: {
    paddingBottom: '1%',
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
              width: '100%',
              marginBottom: '1%'
  },

};

const fjoldatolur = [];
for (let i=1; i <=200; i++) {
  fjoldatolur.push(i);
}



class CourseView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fjoldiByrjun: props.fjoldi[0],
      fjoldiMid: props.fjoldi[1], 
      fjoldiLokaprof: props.fjoldi[2],
      einingar: props.fjoldi[3]
    }
  }

  change0 = (event, index, value) => {
  this.props.breytaFjolda(this.props.afangi,value,0)

  }

  change1 = (event, index, value) => {
    this.props.breytaFjolda(this.props.afangi,value,1)
  }

  change2 = (event, index, value) => {
    this.props.breytaFjolda(this.props.afangi,value,2)

  }
  changeEiningar = (event,index,value) => {
    this.props.breytaFjolda(this.props.afangi,value,3)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({fjoldiByrjun: nextProps.fjoldi[0],
                  fjoldiMid: nextProps.fjoldi[1],
                  fjoldiLokaprof: nextProps.fjoldi[2],
                  einingar: nextProps.fjoldi[3]
    });
  }

  componentWillMount() {

  }


  render() {
    const {fjoldiByrjun, fjoldiMid, fjoldiLokaprof,einingar} = this.state;
    
    return (
      <div>   
        <div style={styles.container}>
          <div style={styles.input}>
            <SelectField
              floatingLabelText="Nemendafjöldi í upphafi kennslu"
              floatingLabelStyle={{color: deepOrangeA400}}
              value={fjoldiByrjun}
              onChange={this.change0}
              underlineFocusStyle={{borderColor: deepOrangeA400}}
              selectedMenuItemStyle={{color: deepOrangeA400}}
            >
            { 
              fjoldatolur.map((item)=> item).map((item)=> <MenuItem key={item} value={item} primaryText={item} />)
            }
            </SelectField>
          </div>
          <div style={styles.input}>
            <SelectField
              floatingLabelText={this.props.onn}
              floatingLabelStyle={{color: deepOrangeA400}}
              value={fjoldiMid}
              onChange={this.change1}
              underlineFocusStyle={{borderColor: deepOrangeA400}}
              selectedMenuItemStyle={{color: deepOrangeA400}}
            >
            { 
              fjoldatolur.map((item)=> item).map((item)=> <MenuItem key={item} value={item} primaryText={item} />)
            }
            </SelectField>
          </div>
          <div style={styles.input}>
            <SelectField
              floatingLabelText="Nemendafjöldi í lokaprófi"
              floatingLabelStyle={{color: deepOrangeA400}}
              value={fjoldiLokaprof}
              onChange={this.change2}
              underlineFocusStyle={{borderColor: deepOrangeA400}}
              selectedMenuItemStyle={{color: deepOrangeA400}}
            >
            { 
              fjoldatolur.map((item)=> item).map((item)=> <MenuItem key={item} value={item} primaryText={item} />)
            }
            </SelectField>
          </div>
          <div style={styles.input}>
            <SelectField
              floatingLabelText="einingar (gamlar)"
              floatingLabelStyle={{color: deepOrangeA400}}
              value={einingar}
              onChange={this.changeEiningar}
              underlineFocusStyle={{borderColor: deepOrangeA400}}
              selectedMenuItemStyle={{color: deepOrangeA400}}
            >
            { 
              ["1", "1,5", "2","2,5","3","3,5","4","4,5","5"].map((item)=> item).map((item)=> <MenuItem key={item} value={item} primaryText={item} />)
            }
            </SelectField>
          </div>
        </div>
       
      </div>

    );
  }
}


export default CourseView