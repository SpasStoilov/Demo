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

export const useGlobalMiddleware = {
    cleanWallfromErrors
};