// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://localhost:4000/api",
  companyColumns: [
    {
      data: "id",
      searchable: false,
    },
    {
      data: "name",
    },
    {
      data: "industry",
      searchable: false,
    },
    {
      data: "founded",
      searchable: false,
    },
  ],
  employeeComlumns: [
    {
      data: "id",
      searchable: false
    },
    {
      data: "firstName",
    },
    {
      data: "lastName",
    },
    {
      data: "company",
    },
    {
      data: "active",
      searchable: false,
    },
  ],
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
