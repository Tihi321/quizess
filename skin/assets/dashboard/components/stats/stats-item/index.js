const StatsItem = (props) => {
  const {
    className = 'stats',
    number,
    correct,
  } = props;

  return (
    <li
      className={`${className}__item`}>
      <div className={`${className}__inner`}>
        {number + 1}.
      </div>
      <div className={`${className}__inner`}>
        {correct}
      </div>
    </li>
  );
};

export default StatsItem;
