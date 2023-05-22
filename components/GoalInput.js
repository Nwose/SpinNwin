import { useState } from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";

function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler(enteredGoalText) {
    setEnteredGoalText(enteredGoalText);
  }

    function addGoalHandler() {
      props.onAddGoal(enteredGoalText);
      setEnteredGoalText('');
    }
    return (
        <View style={styles.inputContainer}>
        <TextInput style={styles.TextInput} placeholder='List of Goals' onChangeText={goalInputHandler} value={enteredGoalText} />
        <Button title='Add Goal!' onPress={addGoalHandler} />
      </View>
    )
}

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
 },
 TextInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '70%',
    marginRight: 8,
    padding: 8,
 },
});