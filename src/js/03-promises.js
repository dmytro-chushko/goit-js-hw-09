import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      
      const shouldResolve = Math.random() > 0.3;
        
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }

    }, delay);

  })
};

function invokPromise(amount, step, delay) {
  
  for (let index = 1; index <= amount; index+=1) {
    
    createPromise(index, delay)
        .then(({ position, delay }) => Notify.success(`Fullfilled promise ${position} in ${delay}ms`))
        .catch(({ position, delay }) => Notify.failure(`Rejected promise ${position} in ${delay}ms`));
    
    delay += step;
  }
} 

function onSubmit(e) {

  e.preventDefault();
  
  let { elements: {
    delay: {value: delay},
    step: {value: step},
    amount: {value: amount}
  } } = e.currentTarget;

  delay = Number(delay);
  step = Number(step);
  amount = Number(amount);
  
  invokPromise(amount, step, delay);
  
}

form.addEventListener('submit', (e) => onSubmit(e));


