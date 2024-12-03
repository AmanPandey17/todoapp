import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) setTasks(JSON.parse(storedTasks));
    };

    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever the tasks state changes
  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = {
        id: Date.now().toString(),
        name: taskInput,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  const toggleComplete = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const renderTask = ({item}) => (
    <TouchableOpacity onPress={() => toggleComplete(item.id)}>
      <View style={styles.taskItem}>
        <Text
          style={[
            styles.taskText,
            item.completed && {
              textDecorationLine: 'line-through',
              color: 'gray',
            },
          ]}>
          {item.name}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', {task: item})}>
          <Text style={styles.detailsButton}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={taskInput}
        onChangeText={setTaskInput}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        style={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#f8f9fa'},
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonText: {color: '#fff', fontWeight: 'bold'},
  taskList: {marginTop: 10},
  taskItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskText: {fontSize: 16},
  detailsButton: {color: '#007bff', marginRight: 10},
  deleteButton: {color: 'red'},
});

export default HomeScreen;
