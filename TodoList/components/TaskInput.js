import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TaskInput = ({ onAddTask }) => {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    onAddTask(task);
    setTask('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleAddTask}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 5,
    marginRight: 10,
    fontSize: 18,
  },
  buttonText: {
    color: 'blue',
    fontSize: 18,
  },
});

export default TaskInput;
