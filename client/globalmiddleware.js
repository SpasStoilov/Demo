import { useService } from "./services.js";

function cleanWallfromErrors(ctx, next){
    console.log('C:>>> Global Middleware: cleanWallfromErrors: acting...')
   
    let wall = document.querySelector('.wall');
    let errHeadRegister = document.querySelector('.errorHeader');
    let errHeadLogin = document.querySelector('.LogInErrHead');
    if (errHeadRegister) {
        wall.removeChild(errHeadRegister);
    };
    if (errHeadLogin) {
        wall.removeChild(errHeadLogin);
    };

    console.log('C:>>> Global Middleware: cleanWallfromErrors: NEXT()...')
    next();
};


function addEventSubmitOnFilterForm(ctx, next){
    
    console.log('C:>>> Global Middleware: addEventSubmitOnFilterForm acting');
    const filterForm = document.querySelector('.filter-form');

    filterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log('C:>>> Global Middleware: addEventSubmitOnFilterForm Event is active...');

        const formDataFilter = new FormData(e.currentTarget);
        const objectData = Object.fromEntries(formDataFilter.entries());
        
        console.log('C:>>> Global Middleware: addEventSubmitOnFilterForm -> FormData:', objectData);
        if (Object.keys(objectData).length !== 0) {
            useService.sendFilteredVrData(objectData);
        };
    
    })
    
    console.log('C:>>> Global Middleware: addEventSubmitOnFilterForm: NEXT()...');
    next();
}

export const useGlobalMiddleware = {
    cleanWallfromErrors,
    addEventSubmitOnFilterForm
};