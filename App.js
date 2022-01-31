import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from "./components/Task";

export default function App() {

  const [task, setTask] = useState();
  const [taskList, setTaskList] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (/\S/.test(task)) {
      setTaskList([...taskList, task]);
      setTask("");
    }
  }

  const completeTask = (index) => {
    console.log("complete");
    let taskListCopy = [...taskList];
    taskListCopy.splice(index, 1);
    setTaskList(taskListCopy);
  }

  return (
    <View style={styles.container}>

      {/* today's taks*/}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Todo List</Text>
        <View style={styles.items}>
          {/* this is where the items will come*/}
          {taskList.map((item, index) => {
            return <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task text={item} />
            </TouchableOpacity>
          })}
        </View>
      </View>


      {/* Write a task section */}

      <KeyboardAvoidingView

        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >

        <TextInput style={styles.taskInput} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED'
  },
  taskWrapper: {
    padding: 50,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  taskInput: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderColor: '#C0C0C0',
    borderRadius: 60,
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addText: {
    fontSize: 20
  }
});
