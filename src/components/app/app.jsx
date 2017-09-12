import React from 'react';
import './app.scss';

import Stats from '../stats/stats';
import Stage from '../stage/stage';

import game from '../../data/game.json';

class App extends React.Component {
  constructor() {
    super();
    this.scenes = game.scenes;

    this.state = {
      stats: game.settings.stats,
      currentScene: 0,
      text: this.scenes[0].consequences[0].text,
      actions: this.scenes[0].consequences[0].actions,
      flags: [],
      history: [{
        stats: game.settings.stats,
        currentScene: 0,
        text: this.scenes[0].consequences[0].text,
        actions: this.scenes[0].consequences[0].actions,
        flags: [],
      }],
    };

    this.handleAction = this.handleAction.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    console.log('app');
  }

  handleAction(consequences) {
    const consequence = this.pickConsequence(consequences);

    if (consequence.move) {
      this.changeScene(consequence.move);
      return;
    }

    if (consequence.goTo) {
      consequence.actions = [{ name: 'continue', consequences: [{move: consequence.goTo }] }];
    }

    this.updateText(consequence.text);
    this.processEffect(consequence.effect);
    this.updateActions(consequence.actions);
    this.processFlags(consequence.flags);


    this.setState((state) => {
      const history = state.history;
      history.push({
        text: state.text,
        stats: state.stats,
        actions: state.actions,
        currentScene: state.currentScene,
        flags: state.flags,
        effect: state.effect,
      });

      return { history };
    });

    //this.move(consequence.goTo);
  }

  componentDidMount() {
    //window.setInterval(() => {
      //const opacity = Math.floor(Math.random() * 10) + 40;
      //const density = Math.floor(Math.random() * 20);
      //const bg = `url(http://api.thumbr.it/whitenoise-361x370.png?background=000000ff&noise=ffffff&density=${density}&opacity=${opacity})`;

      //window.document.body.style.backgroundImage = bg;
    //}, 1000)
  }

  pickConsequence(consequences) {
    if (consequences.length === 1) {
      return consequences[0];
    }

    console.log(consequences);

    let sortedConsequences = consequences.map((consequence) => {
      const scoredConsequence = consequence;

      scoredConsequence.score = consequence.conditions.reduce((acc, condition) =>
        acc + this.checkCondition(condition),
      0);

      return scoredConsequence;
    });

    sortedConsequences = sortedConsequences.sort((a, b) => a.score <= b.score);

    return sortedConsequences[0];
  }

  checkCondition(condition) {
    const { value, stat, type, operator } = condition;
    if (type === 'default') {
      return 0;
    }

    if (type === 'flag') {
      return this.state.flags.indexOf(value) > -1 ? 1 : -10;
    }

    const finalStat = this.state.stats.find(currentStat =>
      currentStat.name.toLowerCase() === stat,
    );

    switch (operator) {
      case '>':
        return finalStat.current > value ? 1 : -10;
      case '<':
        return finalStat.current < value ? 1 : -10;
      case '=':
      default:
        return finalStat.current === value ? 1 : -10;
    }
  }

  processEffect(effect) {
    if (!effect) {
      return;
    }

    this.setState((prevState) => {
      const stats = prevState.stats.map((stat) => {
        if (stat.name.toLowerCase() !== effect.attr) {
          return stat;
        }

        return {
          name: stat.name,
          current: stat.current + effect.modifier,
          max: stat.max,
        };
      });

      return { stats };
    });
  }

  changeScene(goTo) {
    const sceneIndex = this.scenes.findIndex(scene => scene.name.toLowerCase() === goTo);
    console.log(goTo);

    this.setState({
      currentScene: sceneIndex,
    });

    this.handleAction(this.scenes[sceneIndex].consequences);
  }

  updateText(text) {
    this.setState((prevState) => {
      return { text: prevState.text.concat(text) };
    });
  }

  updateActions(actions) {
    this.setState({ actions });
  }

  processFlags(flags) {
    if (!flags) {
      return;
    }

    this.setState({
      flags: this.state.flags.concat(flags),
    });
  }

  handleUndo() {
    if (this.state.history.length < 2) {
      return;
    }

    const trimmedHistory = this.state.history.slice(0, -1);
    const previousState = trimmedHistory[trimmedHistory.length - 1];

    this.setState({ history: trimmedHistory });
    this.setState({ stats: previousState.stats });
    this.setState({ text: previousState.text });
    this.setState({ actions: previousState.actions });
    this.setState({ flags: previousState.flags });
    this.setState({ currentScene: previousState.currentScene });
  }

  render() {
    // <UndoButton onUndo={this.handleUndo} />
    return (
      <div className="app">
        <div className="app__column app__column--full">
          <h1 className="app__title">192 Nausikaa – an interactive fiction story</h1>
        </div>
        <div className="app__column app__column--first">
          <Stage
            title={this.scenes[this.state.currentScene].name}
            text={this.state.text}
            actions={this.state.actions}
            onAction={this.handleAction}
          />
        </div>
        <div className="app__column app__column--second">
          <Stats stats={this.state.stats} flags={this.state.flags} />
        </div>
      </div>
    );
  }
}

export default App;
