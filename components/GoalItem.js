import { StyleSheet, Text, View } from 'react-native';
function goalItem(props) {
    return (
         <View style={styles.goalItem}>
                <Text style={styles.goalText}>
                  {props.text}
                </Text>
          </View>
    );
}

export default goalItem;

const styles = StyleSheet.create({
    goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',

 },
    goalText: {
        color: 'white'
    }
});