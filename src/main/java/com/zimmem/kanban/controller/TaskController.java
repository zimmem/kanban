package com.zimmem.kanban.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.zimmem.kanban.dataobject.Task;
import com.zimmem.kanban.repository.TaskRepository;

@RestController
@RequestMapping("/tasks")
public class TaskController {

	@Autowired
	private TaskRepository taskRepository;

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public Iterable<Task> all() {
		return taskRepository.findAll();
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public Task createTask(@RequestBody Task task) {
		Task saved = taskRepository.save(task);
		return saved;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public Task updateTask(@RequestBody Task task) {
		Task saved = taskRepository.save(task);
		return saved;
	}

	@RequestMapping(value = "current-waitting", method = RequestMethod.GET)
	@ResponseBody
	public List<Task> currentWaitting() {
		return null;
	}

	@RequestMapping(value = "current-processing", method = RequestMethod.GET)
	@ResponseBody
	public List<Task> currentProcessing() {
		return null;
	}

}
