import { AiFillCloseCircle } from 'react-icons/ai';
import { ButtonAddTodo } from '../components/ButtonAddTodo';
import { useContext, useEffect } from 'react';
import { TodoAppContext } from '../context';

export const FormAddTodo = () => {
  const { todos, setTodos, showForm, setShowForm, isEditing, setIsEditing, todoInfo, setTodoInfo } =
    useContext(TodoAppContext);

  useEffect(() => {
    isEditing.isEditing && setTodoInfo(todos[todos.indexOf(todos.find((todo) => todo.title === isEditing.todo.title))]);
  }, [isEditing.isEditing, todos, isEditing.todo, setTodoInfo]);

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    setShowForm(false);
    setIsEditing({ ...isEditing, isEditing: false });
    setTodos([todoInfo, ...todos]);
    setTodoInfo({ isCompleted: false });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    setIsEditing({ ...isEditing, isEditing: false });
    setShowForm(false);
    const newTodos = [...todos];
    newTodos[todos.indexOf(todos.find((todo) => todo.title === isEditing.todo.title))] = todoInfo;
    setTodos([...newTodos]);
    setTodoInfo({ isCompleted: false });
  };

  const handleChange = (e) => {
    setTodoInfo({
      ...todoInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {(showForm || isEditing.isEditing) && (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center w-full h-screen bg-black bg-opacity-50 overscroll-none'>
          <form className='relative z-30 w-5/6 p-10 m-auto text-center bg-white border border-gray-400 rounded-lg md:w-1/2'>
            <div className='absolute top-0 right-0'>
              <AiFillCloseCircle
                className='text-3xl text-black duration-300 rounded-full hover:text-white hover:bg-black'
                onClick={() => {
                  setShowForm(false);
                  setIsEditing({ ...isEditing, isEditing: false });
                  setTodoInfo({ isCompleted: false });
                }}
              />
            </div>
            <h1 className='text-4xl font-bold text-center'>
              {isEditing.isEditing ? 'Edita tu tarea' : 'A??ade tu tarea'}
            </h1>
            <div>
              <input
                type='text'
                placeholder='Title of the task'
                name='title'
                className='mt-10 input'
                value={todoInfo.title || ''}
                onChange={handleChange}
              />

              <textarea
                name='description'
                className='resize-y input'
                placeholder='Description'
                value={todoInfo.description || ''}
                onChange={handleChange}
              />

              <input type='date' name='date' className='input' value={todoInfo.date || ''} onChange={handleChange} />
            </div>
            {isEditing.isEditing ? (
              <button className='mt-7 button button-blue' onClick={handleSubmitEdit}>
                Aceptar
              </button>
            ) : (
              <button className='mt-7 button button-blue' onClick={handleSubmitAdd}>
                Enviar
              </button>
            )}
          </form>
        </div>
      )}
      <ButtonAddTodo showForm={showForm} setShowForm={setShowForm} />
    </>
  );
};
