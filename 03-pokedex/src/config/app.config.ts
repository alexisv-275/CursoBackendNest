export const EnvConfiguration = () =>({
    //Mapear las variables de entorno a un objeto
    environment : process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    defaultLimit : process.env.DEFAULT_LIMIT || 7,

})