function cleanWallfromErrors(ctx, next){
    let wall = document.querySelector('.wall');
    let errHeadRegister = document.querySelector('.errorHeader');
    let errHeadLogin = document.querySelector('.LogInErrHead');
    if (errHeadRegister) {
        wall.removeChild(errHeadRegister);
    };
    if (errHeadLogin) {
        wall.removeChild(errHeadLogin);
    };
    next();
};

export const useGlobalMiddleware = {
    cleanWallfromErrors
};