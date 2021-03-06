﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Timesheets.Contracts;
using Timesheets.Dtos;

namespace Timesheets.Controllers
{
    public class ServiceController : Controller
    {
        private ITimesheetClient _timesheetRepositoryClient;

        public ServiceController(ITimesheetClient timesheetRepositoryClient)
        {
            _timesheetRepositoryClient = timesheetRepositoryClient;
        }

        public JsonResult CreateTimesheet(NewTimesheetsRequest newTimesheets)
        {
            return Json(_timesheetRepositoryClient.Create(newTimesheets));
        }

        public JsonResult DeleteTimesheets(IEnumerable<string> ids)
        {
            return Json(_timesheetRepositoryClient.DeleteTimesheets(ids));
        }

        public JsonResult GetTimesheet(string id)
        {
            return Json(_timesheetRepositoryClient.Get(id));
        }

        public JsonResult GetAllTimesheets()
        {
            return Json(_timesheetRepositoryClient.GetAll());
        }

        public JsonResult SearchTimesheets(SearchRequest request)
        {
            return Json(_timesheetRepositoryClient.Search(request));
        }
    }
}