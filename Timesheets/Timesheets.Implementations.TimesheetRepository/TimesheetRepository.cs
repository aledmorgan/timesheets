﻿using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Timesheets.Contracts;
using Timesheets.Dtos;

namespace Timesheets.Implementations.TimesheetRepository
{
    public class TimesheetRepository : ITimesheetRepository
    {
        private IMongoCollection<Timesheet> _collection;
        private const string _databaseName = "timesheetsDb";
        private const string _collectionsName = "timesheets";

        public TimesheetRepository()
        {
            var client = new MongoClient();
            var db = client.GetDatabase(_databaseName);
            _collection = db.GetCollection<Timesheet>(_collectionsName);
        }

        public void Create(Timesheet newTimesheet)
        {
            try
            {
                _collection.InsertOne(newTimesheet);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Delete(int id)
        {
            try
            {
                var filter = Builders<Timesheet>.Filter.Eq("Id", id);
                _collection.DeleteOne(filter);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Timesheet Get(int id)
        {
            try
            {
                var filter = Builders<Timesheet>.Filter.Eq("Id", id);
                return _collection.Find(filter).First();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IEnumerable<Timesheet> GetAll()
        {
            try
            {
                return _collection.Find(_ => true).ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
