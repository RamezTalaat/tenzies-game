export default function Die(props) {
  const styles = {
    backgroundColor: props.data.isHeld ? "#59E391" : "white",
  };

  return (
    <button className="die-button" style={styles} onClick={()=> props.hold(props.data.id)}>
      {props.data.value}
    </button>
  );
}
