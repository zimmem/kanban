package com.zimmem.kanban.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.zimmem.kanban.dataobject.Task;



public interface TaskRepository extends PagingAndSortingRepository<Task, Long>{

}
