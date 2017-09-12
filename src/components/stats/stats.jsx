import React from 'react';
import './stats.scss';

import Counter from '../stats/counter';
import Flags from '../stats/flags';

class Stats extends React.Component {
  render() {
    const stats = this.props.stats.map((stat) =>
      (<Counter
        key={stat.name}
        title={stat.name}
        current={stat.initial}
        max={stat.max}
      />),
    );

    //<Flags data={this.props.flags} />
    return (
      <div className="stats">
        <div>
          {stats}
        </div>
      </div>
    );
  }
}

export default Stats;
