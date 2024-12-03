import {View, Text, StyleSheet} from 'react-native';

const ListScreen = ({route}) => {
  const {task} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Details</Text>
      <Text style={styles.detail}>Task Name: {task.name}</Text>
      <Text style={styles.detail}>
        Status: {task.completed ? 'Completed' : 'Pending'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  detail: {fontSize: 18},
});

export default ListScreen;
