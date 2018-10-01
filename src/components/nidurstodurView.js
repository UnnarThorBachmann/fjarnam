import React, {Component} from 'react';

import {grey900,deepOrangeA400} from 'material-ui/styles/colors';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {List, ListItem} from 'material-ui/List';

import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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

  const fjordungarDict = {
      sumar: {
        vikur: [6,6,6], 
        dags: ['1. júlí', '1. ágúst', '1. september']
      },
      haust:  {
        vikur: [4,4,6,4],
        dags: ['1. október', '1. nóvember', '1. janúar', '1. febrúar']
      },
      vor: {
         vikur: [4,4,4,2,4],
         dags: ['1. febrúar', '1. mars', '1. apríl', '1. maí', '1. júní'] 
      }
  }


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
    return (vinnumatA+vinnumatC)/skylda*100;
  }

  talaToString = (tala,digit)=> {
    
    return tala?tala.toFixed(digit).toString().replace('.',','):0;
  }

  reiknaKstundir = (onn,nemendafjoldi,einingar) => {
    const vikur = fjordungarDict[onn].vikur;
    let kennslustundir;
    if (onn==='vor') {
      kennslustundir = [(1+ (2*einingar-1)*nemendafjoldi[0]/39)*vikur[0]/18,
                        (1+ (2*einingar-1)*nemendafjoldi[0]/39)*vikur[1]/18,
                        (1+ (2*einingar-1)*nemendafjoldi[1]/39)*vikur[2]/18,
                        (1+ (2*einingar-1)*nemendafjoldi[1]/39)*vikur[3]/18,
                        (1+ (2*einingar-1)*nemendafjoldi[2]/39)*vikur[4]/18
                      ];
    }
    else if (onn==='haust') {
      kennslustundir = [(1+ (2*einingar-1)*nemendafjoldi[0]/39)*vikur[0]/18,
                        (1+ (2*einingar-1)*nemendafjoldi[0]/39)*vikur[1]/18,
                        (1+ (2*einingar-1)*nemendafjoldi[1]/39)*vikur[2]/18,
                        (1+ (2*einingar-1)*nemendafjoldi[2]/39)*vikur[3]/18
      ];
    }
    else {
      kennslustundir = [(1+ (2*einingar-1)*nemendafjoldi[0]/39)*vikur[0]/18,
                        (1+ (2*einingar-1)*nemendafjoldi[1]/39)*vikur[1]/18,
                        (1+ (2*einingar-1)*nemendafjoldi[2]/39)*vikur[2]/18,
      ];

    }
    
    return kennslustundir;
  }
  extendNemendafjoldi = (onn,nemendafjoldi)=> {
    if (onn==='vor') {
      return [nemendafjoldi[0],nemendafjoldi[0], nemendafjoldi[1], nemendafjoldi[1], nemendafjoldi[2]];
    }
    else if (onn==='haust') {
      return [nemendafjoldi[0],nemendafjoldi[0], nemendafjoldi[1], nemendafjoldi[2]]

    }
    else {
            return [nemendafjoldi[0], nemendafjoldi[1], nemendafjoldi[2]];
    }
  }
  reiknaFjordunga = (onn, afangar, skuldin) => {
    let fjordungar = {};
    fjordungar = {vikur: fjordungarDict[onn].vikur};
    fjordungar = {...fjordungar, dags: fjordungarDict[onn].dags};
    
    let courses = Object.keys(afangar).reduce((acc,curr)=> {
      const e = parseFloat(afangar[curr][3].replace(',','.'));
      const n = [afangar[curr][0], afangar[curr][1], afangar[curr][2]];
      return {...acc, [curr]: {nemendafjoldi: this.extendNemendafjoldi(onn,n), 
                                einingar: e,
                                kennslustundir: this.reiknaKstundir(onn,n,e)}}
    },{});

    fjordungar = {...fjordungar,
                      afangar: courses, 
                      kennslustundir: fjordungarDict[onn].vikur.map((item,index)=> Object.keys(courses).reduce((acc,curr)=>{
                        return {...acc, [curr]: courses[curr].kennslustundir[index]};
                      },{})),
                      skuldir: fjordungarDict[onn].vikur.map(item=> [item*skuldin/18]),
    };
    fjordungar = {...fjordungar, 
                  kennslustundirSamtals: fjordungar.kennslustundir.map((obj,index)=> 
                    Object.keys(obj).reduce((acc,curr)=>{return acc + obj[curr];},0) )};
    fjordungar = {...fjordungar, dagvinnustundir: fjordungar.kennslustundirSamtals.map(item=> item*1.8*18)}
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
    let {skuldir, dagvinnustundir} = fjordungar;
    const lengdFjordunga = fjordungar.dags.length;
    let yfirvinna = dagvinnustundir.map(item=> 0);
    for (const i in fjordungar.dags) {
      const eftirstodvar = skuldir[i].reduce((acc,curr)=>{return acc + curr},0) + dagvinnustundir[i];

      if (eftirstodvar >= 0) {
        yfirvinna[i] = 1.3*eftirstodvar/1.8;
      }
      
    }
    
    
    const {dags,vikur,kennslustundirSamtals} = fjordungar;
    return (
      <div>
        <h4>Uppgjör við dagskóla</h4>
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
        <h4>Uppgjör við fjarnám</h4>
        <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Dagsetning</TableHeaderColumn>
            <TableHeaderColumn>Vikur</TableHeaderColumn>
            <TableHeaderColumn>Kennslustundir</TableHeaderColumn>

            <TableHeaderColumn>Dagvinnustundir</TableHeaderColumn>
            <TableHeaderColumn style={{width: '25%'}}>Sundurliðun skuldir (klst)</TableHeaderColumn>

            <TableHeaderColumn>Skuldir (klst)</TableHeaderColumn>
            <TableHeaderColumn>Yfirvinna (klst)</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            dags.map((item,index)=>
            <TableRow key={index}>
              <TableRowColumn>{item}</TableRowColumn>
              <TableRowColumn>{vikur[index]}</TableRowColumn>
              <TableRowColumn>{kennslustundirSamtals[index].toFixed(1)}</TableRowColumn>              

              <TableRowColumn>{dagvinnustundir[index].toFixed(1)}</TableRowColumn>              
              <TableRowColumn style={{width: '25%'}}>
                {skuldir[index].reduce((acc,curr)=> {return acc + `${curr.toFixed(1)}`},'')}
              </TableRowColumn>

              <TableRowColumn>{skuldir[index].reduce((acc,curr)=> {return acc +curr},0).toFixed(1)}</TableRowColumn>
              <TableRowColumn>{yfirvinna[index].toFixed(1)}</TableRowColumn>
            </TableRow>)
          }
          <TableRow key={-1}>
              <TableRowColumn>Samtals</TableRowColumn>
              <TableRowColumn>{vikur.reduce((acc,curr)=> {return acc +curr},0)}</TableRowColumn>
              <TableRowColumn>{kennslustundirSamtals.reduce((acc,curr)=> {return acc +curr},0)}</TableRowColumn>              

              <TableRowColumn>{dagvinnustundir.reduce((acc,curr)=> {return acc +curr},0).toFixed(1)}</TableRowColumn>              
              <TableRowColumn style={{width: '25%'}}>
                {}
              </TableRowColumn>

              <TableRowColumn>{(Math.min(dagvinnustundir.reduce((acc,curr)=> {return acc +curr},0)+skuldin,0)).toFixed(1)}</TableRowColumn>
              <TableRowColumn>{yfirvinna.reduce((acc,curr)=> {return acc +curr},0).toFixed(1)}</TableRowColumn>
            </TableRow>)
        </TableBody>
      </Table>
      
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