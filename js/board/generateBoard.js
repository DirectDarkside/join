function generateCard(task, index, subTaskCheckLength) {
  return /*html*/ `
        <div class="card" draggable="true" ondragstart="startDragging('${task.id}', this)" onclick="renderPopUpCard('${task.id}')">
          <section class="card_headline">
            <span id="card_category_${task.categoryBoard}${index}">${task.category}</span>
            <div onclick="showSettingPopUp(event, ${task.id}, ${index}, '${task.categoryBoard}')" id="card_settings_container${index}">
              <img src="./assets/img/board/switch.png" alt="change board category">
              <div id="popup_container_${task.categoryBoard}${index}" onclick="stopEvent(event)">
              </div>
            </div>
          </section>
          <section>
            <h2>${task.title}</h2>
          </section>
          <section class="card_description">${task.description}</section>
          <section class="card_subtasks">
            <progress id="subtask_progress" value="${subTaskCheckLength}" max="${task.subtasks.length}"></progress>
            <label for="subtask_progress">${subTaskCheckLength}/${task.subtasks.length} Subtasks</label>
          </section>
          <section class="card_footer">
            <div id="card_profile_img_container_${task.categoryBoard}${index}" class="profiles">
            </div>
            <div>
              <img id="card_prio_${task.categoryBoard}${index}" src="./assets/img/add_task/medium_color.png">
            </div>
          </section>
        </div>
    `;
}

function generateCardContactProfile(profileName, i, categoryBoard, index) {
  return /*html*/`
    <span class="profile_span" id="card_profile_span_${categoryBoard}${index}${i}">${profileName}</span>
  `;
}

function generateCategorys() {
  return /*html*/ `
        <div class="category">
          <div class="category_headline">
            <b>To do</b> <img id="category_headline_img0" src="./assets/img/board/plus.png" alt="create Task" onclick="renderTaskInBoardCategory('toDo')">
          </div>
          <div class="category_content" id="toDo" ondragleave="removeHighlight('toDo')" ondrop="moveTo('toDo')" ondragover="allowDrop(event); highlight('toDo')">       
          </div>
        </div>
        <div class="category">
          <div class="category_headline">
            <b>In progress</b><img id="category_headline_img1" src="./assets/img/board/plus.png" alt="create Task" onclick="renderTaskInBoardCategory('inProgress')">
          </div>
          <div class="category_content" id="inProgress" ondragleave="removeHighlight('inProgress')" ondrop="moveTo('inProgress')" ondragover="allowDrop(event); highlight('inProgress')">    
          </div>
        </div>
        <div class="category">
          <div class="category_headline">
            <b>Await feedback</b> <img id="category_headline_img2" src="./assets/img/board/plus.png" alt="create Task" onclick="renderTaskInBoardCategory('awaitFeedback')">
          </div>
          <div class="category_content" id="awaitFeedback" ondragleave="removeHighlight('awaitFeedback')" ondrop="moveTo('awaitFeedback')" ondragover="allowDrop(event); highlight('awaitFeedback')">
          </div>
        </div>
        <div class="category">
          <div class="category_headline">
            <b>Done</b> <img id="category_headline_img3" src="./assets/img/board/plus.png" alt="create Task" onclick="renderTaskInBoardCategory('done')">
          </div>
          <div class="category_content" id="done" ondragleave="removeHighlight('done')" ondrop="moveTo('done')" ondragover="allowDrop(event); highlight('done')">
          </div>
        </div>
    `;
}

function generateAddTask(renderFuctionPara) {
  return /*html*/ `
    <section class="header template" onclick="stopEvent(event)">
    <section class="add_task_content" onclick="closeDropdown()">
        <form onsubmit="checkForm(event, '${renderFuctionPara}'); setAddTasksInTasks()">
            <div class="main_content">
                <h1 class="add_task_headline">Add Task</h1>
                <div class="form_content">
                    <div>
                        <label for="title_input">
                            <h2>Title<span class="required_char">*</span></h2>
                            <input required type="text" id="title_input" class="input" placeholder="Enter a title">
                        </label>
                        <label for="description_textarea">
                            <h2>Description</h2>
                            <textarea name="" id="description_textarea" cols="30" rows="4"
                                placeholder="Enter a Description" class="input"></textarea>
                        </label>
                        <label for="select_contact">
                            <h2>Assigned to</h2>
                            <div id="assigned_container" onclick="stopEvent(event)">
                                <select name="" id="select_contact" placeholder="test" class="select"
                                    onclick="renderInputAssigned()">
                                    <option value="" disabled selected>Select contacts to assign</option>
                                </select>
                            </div>
                            <div id="assigned_contact_profiles">
                            </div>
                        </label>
                    </div>
                    <div class="break_line"></div>
                    <div>
                        <label for="date_input">
                            <h2>Due date<span class="required_char">*</span></h2>
                            <input required type="text" placeholder="dd/mm/yyyy" id="date_input"
                                onfocus="(this.type='date')" class="input">
                        </label>
                        <label for="">
                            <h2>Prio</h2>
                            <div class="prio_category">
                                <span class="prio_category_span" onclick="setActivePrio(0, 'urgent')">
                                    <h2 id="prio_headline0">Urgent<span><img id="prio_category_img0"
                                                src="./assets/img/add_task/urgent_color.png"></span></h2>
                                </span>
                                <span class="prio_category_span" onclick="setActivePrio(1, 'medium')">
                                    <h2 id="prio_headline1">Medium<span><img id="prio_category_img1"
                                                src="./assets/img/add_task/medium_color.png"></span></h2>
                                </span>
                                <span class="prio_category_span" onclick="setActivePrio(2, 'low')">
                                    <h2 id="prio_headline2">Low<span><img id="prio_category_img2"
                                                src="./assets/img/add_task/low_color.png"></span></h2>
                                </span>
                            </div>
                        </label>
                        <label for="select_category">
                            <h2>Category<span class="required_char">*</span></h2>
                            <select name="" id="select_category" class="select" required>
                                <option value="" disabled selected>Select task category</option>
                                <option value="User Story">User Story</option>
                                <option value="Technical Task">Technical Task</option>
                            </select>
                        </label>
                        <label for="input_subtask">
                            <h2>Subtasks</h2>
                            <div class="subtask_input">
                                <input type="text" id="input_subtask" placeholder="Add new subtask" class="input">
                                <span onclick="setSubTask()"><button type="button">+</button></span>
                            </div>
                        </label>
                        <div id="subtask_content">
                        </div>
                    </div>
                </div>
                <section class="add_task_footer">
                    <div>
                        <p><span class="required_char">*</span>This field is required</p>
                    </div>
                    <div class="form_button_container">
                        <button class="form_button_clear" id="clear_button" onclick="clear()"><span>Clear</span> <img
                                src="./assets/img/add_task/clear.png" alt="clear button"></button>
                        <button class="form_button_create" type="submit"><span>Create Task</span> <img
                                src="./assets/img/add_task/check.png" alt="create task button"></button>
                    </div>
                </section>
                <div class="mobile_sidebar_container"></div>
            </div>
        </form>
        <div id="create_popup">
            <div class="create_card">
                <span>Task added to board</span>
                <img src="./assets/img/add_task/create_popup.png">
            </div>
        </div>
    </section>
</section>
  `;
}

function generatePopUpCard(task, date, prio) {
  return /*html*/ `
        <section class="overlay">
      <div class="overlay_header">
        <span class="overlay_user_task" id="popup_category_headline">${task.category}</span>
        <span onclick="closePopUpCard()" class="close"
          ><img
            class="closeIcon"
            src="./assets/img/img_summary/close.png"
            alt=""
        /></span>
      </div>
      <h1>${task.title}</h1>
      <span class="overlay_text"
        >${task.description}</span
      >
      <div class="overlay_flex_field">
        <div class="due_date">Due date:</div>
        <div class="date">${date}</div>
      </div>
      <div class="overlay_flex_field">
        <div class="due_date">Priority:</div>
        <div class="overlay_priority" id="popup_prio_container">
          <div class="Priority">${prio}</div>
          <img src="" id="popup_prio_img">
        </div>
      </div>
      <div class="stretch">
        <div class="overlay_assigned_to" id="popup_assigned_to">Assigned To:</div>       
        </div>
      </div>
      <div class="stretch">
        <div class="overlay_subtasks">Subtasks</div>
        <div class="subtasks_check" id="popup_subtask_container">
        </div>
      </div>
      <div class="overlay_edit">
        <div class="edit_area" onclick="deleteTask(${task.id})">
          <img
            class="edit_area_img"
            src="./assets/img/img_summary/delete.png"
            alt=""
          />
          <span class="edit_text">Delete</span>
        </div>
        <img src="./assets/img/img_summary/Vector.png" alt="" />
        <div class="edit_area" onclick="renderPopUpCardEdit(${task.id})">
          <img
            class="edit_area_img"
            src="./assets/img/img_summary/edit.png"
            alt=""
          />
          <span class="edit_text">Edit</span>
        </div>
      </div>
    </section>
    `;
}

function generatePopUpSubtasks(subTask, index, task) {
  return /*html*/ `
        <div class="assigned_to_container">
            <input type="checkbox" id="popup_checkbox${index}" onchange="setPopUpCheck(${task.id}, ${index}, '${subTask.title}')">
            <label for="popup_checkbox${index}">${subTask.title}</label>
        </div>
    `;
}

function generateEmpyCard() {
  return /*html*/ `
      <div class="empty_card">
         <span>No tasks</span>
      </div>
  `;
}

function generateAssignContact(contact, index) {
  return /*html*/ `
      <div class="assigned_to_container">
          <div class="assigned_to_field">
            <div id="card_profile_fullpopup_container${index}">
              <img src="./assets/img/img_summary/profilImg.png" alt="" />
            </div>
            <div class="user_name">${contact}</div>
          </div>
        </div>
  `;
}


function generatePopUpCardEdit(task) {
  return /*html*/`
    <div class="edit_content" onclick="closeDropdownForEdit()">
      <div class="button_container_edit">
        <img onclick="renderPopUpCard('${task.id}')" class="closeIcon" src="./assets/img/img_summary/close.png" alt="close button">
      </div>
      <div>
          <label for="title_input_edit">
              <h2>Title<span class="required_char">*</span></h2>
              <input required type="text" id="title_input_edit" class="input_edit" placeholder="Enter a title" value="${task.title}">
          </label>
          <label for="description_textarea">
              <h2>Description</h2>
              <textarea id="description_textarea_edit" cols="30" rows="2" placeholder="Enter a Description" class="input_edit"></textarea>
          </label>
          <label for="select_contact">
              <h2>Assigned to</h2>
              <div id="assigned_container_edit">
                  <select name="" id="select_contact" placeholder="test" class="select" onclick="renderInputAssignedForEdit()">
                      <option value="" disabled selected>Select contacts to assign</option>
                  </select>
                  <div id="assigned_contact_profiles_edit">
                  </div>
              </div>
          </label>
      </div>
      <div class="break_line"></div>
      <div>
          <label for="date_input">
              <h2>Due date<span class="required_char">*</span></h2>
              <input required type="date" id="date_input_edit" class="input_edit" value="${task.dueDate}">
          </label>
          <label for="">
              <h2>Prio</h2>
              <div class="prio_category">
                  <span class="prio_category_span_edit edit_category" onclick="setActivePrioEdit(0, 'urgent')">
                      <h2 id="prio_headline0_edit">Urgent<span><img id="prio_category_img0_edit" src="./assets/img/add_task/urgent_color.png"></span></h2>
                  </span>
                  <span class="prio_category_span_edit edit_category" onclick="setActivePrioEdit(1, 'medium')">
                      <h2 id="prio_headline1_edit">Medium<span><img id="prio_category_img1_edit" src="./assets/img/add_task/medium_color.png"></span></h2>
                  </span>
                  <span class="prio_category_span_edit edit_category"onclick="setActivePrioEdit(2, 'low')">
                      <h2 id="prio_headline2_edit">Low<span><img id="prio_category_img2_edit" src="./assets/img/add_task/low_color.png"></span></h2>
                  </span>
              </div>
          </label>
          <label for="select_category" class="d-none">
              <h2>Category<span class="required_char">*</span></h2>
              <select name="" id="select_category_edit" class="select" required>
                  <option value="" disabled selected>Select task category</option>
                  <option value="User Story">User Story</option>
                  <option value="Technical Task">Technical Task</option>
              </select>
          </label>
          <label for="input_subtask">
              <h2>Subtasks</h2>
              <div class="subtask_input">
                  <input type="text" id="input_subtask_edit" placeholder="Add new subtask" class="input_edit">
                  <span onclick="setSubTaskForEdit()"><button type="button">+</button></span>
              </div>
          </label>
          <div id="subtask_content_edit">

          </div>
          <div class="button_container_edit">
            <button onclick="editPopUpSave(${task.id})">Ok <img src="./assets/img/board/check.png"></button>
          </div>
      </div>
    </div>
  `
}

function generateSubTaskEditForEditPopUp(task, index) {
  return /*html*/ `
        <span id="subtask_information_span${index}_edit">
            <span id="subtask_title${index}">${task.title}</span>
        </span>
        <span class="subtask_hover_icons" id="subtask_icon_container${index}_edit">
            <img src="./assets/img/add_task/pen.png" alt="Edit subtask" class="subtask_icon icon" id="edit_subtask_img${index}" onclick="editSubTaskForEditPopUp(${index})">
            <img src="./assets/img/add_task/trash.png" alt="delete icon" class="subtask_icon icon" id="delete_subtask_img${index}" onclick="deleteSubTask(${index})">
        </span>
    `;
}

function generateSubTaskForEditPopUp(task, index, id) {
  return /*html*/ `
        <p id="subtask_paragraph${index}_edit">
        <span id="subtask_information_span${index}_edit">
            <span>•</span>
            <span>${task.title}</span>
        </span>
            <span class="subtask_hover_icons" id="subtask_icon_container${index}_edit">
                <img src="./assets/img/add_task/pen.png" alt="Edit subtask" class="subtask_icon icon" id="edit_subtask_img${index}_edit" onclick="editSubTaskForEditPopUp(${index}, ${id})">
                <img src="./assets/img/add_task/trash.png" alt="delete icon" class="subtask_icon icon" id="delete_subtask_img${index}_edit" onclick="deleteSubTaskForEdit(${index}, ${id})">
            </span>
        </p>
    `;
}

function generateSubTaskIconEditForEditPopUp(index, task) {
  return /*html*/ `
        <img src="./assets/img/add_task/trash.png" alt="delete subtask" class="edit_icon icon" id="edit_subtask_img${index}_edit" onclick="deleteSubTaskForEdit(${index}, ${task.id})">
        <img src="./assets/img/add_task/done.png" alt="delete icon" class="edit_icon icon" id="delete_subtask_img${index}_edit" onclick="saveSubTaskForEdit(${index})">
    `;
}

function generateAssignSelectionForEdit() {
  return /*html*/ `
      <select name="" id="select_contact" placeholder="test" class="select" onclick="renderInputAssignedForEdit()">
          <option value="" disabled selected>Select contacts to assign</option>
      </select>
      <div id="assigned_contact_profiles_edit">
      </div>
  `;
}

function generateInputAssignedForEdit() {
  return /*html*/ `
    <div class="assign_input_container" onclick="stopEvent(event)">
      <input type="text" class="input" id="assigned_input_edit" onkeyup="searchContactForEdit()">
      <span><img src="./assets/img/add_task/arrow_drop_up.png" alt="close dropdown"></span>
    </div>
    <div id="input_assigned_content_edit" onclick="stopEvent(event)" class="contact_list">
    </div>
  `;
}

function generateSettingsPopUp(taskId, index) {
  return /*html*/`
    <div class="card_setting_popup">
        <a onclick="popUpMoveTo(${taskId}, 'toDo', ${index})">Todo</a>
        <a onclick="popUpMoveTo(${taskId}, 'inProgress', ${index})">In progress</a>
        <a onclick="popUpMoveTo(${taskId}, 'awaitFeedback', ${index})">Await Feedback</a>
        <a onclick="popUpMoveTo(${taskId}, 'done', ${index})">Done</a>
    </div>
  `;
}