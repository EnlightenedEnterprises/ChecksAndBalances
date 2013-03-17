﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ChecksAndBalances.Data.Storage.Sessions
{
    public class EFCodeFirstSession : ISession
    {
        DbContext _context;
        public EFCodeFirstSession(DbContext context)
        {
            _context = context;
        }

        public void CommitChanges()
        {
            _context.SaveChanges();
        }

        public void Delete<T>(Expression<Func<T, bool>> expression) where T : class, IEntity, new()
        {
            var query = All<T>().Where(expression);
            foreach (var item in query)
            {
                Delete(item);
            }
        }

        public void Delete<T>(T item) where T : class, IEntity, new()
        {
            _context.Entry<T>(item).State = System.Data.EntityState.Deleted;
        }

        public void DeleteAll<T>() where T : class, IEntity, new()
        {
            var query = All<T>();
            foreach (var item in query)
            {
                Delete(item);
            }
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public T Single<T>(Expression<Func<T, bool>> expression) where T : class, IEntity, new()
        {
            return All<T>().FirstOrDefault(expression);
        }

        public DbSet<T> All<T>() where T : class, IEntity, new()
        {
            return _context.Set<T>();
        }

        public void Add<T>(T item) where T : class, IEntity, new()
        {
            _context.Entry<T>(item).State = System.Data.EntityState.Added;
        }

        public void Add<T>(IEnumerable<T> items) where T : class, IEntity, new()
        {
            if (items == null)
            {
                return;
            }

            foreach (var item in items)
            {
                Add(item);
            }
        }

        public void Update<T>(T item) where T : class, IEntity, new()
        {
            var entry = _context.Entry<T>(item);

            var attachedEntity = _context.Set<T>().Find(item.Id);
            if (attachedEntity != null)
            {
                _context.Entry<T>(attachedEntity).CurrentValues.SetValues(item);
                _context.Entry<T>(attachedEntity).State = System.Data.EntityState.Modified;
            }
            else
            {
                _context.Entry<T>(item).State = System.Data.EntityState.Modified;
            }
        }

        public void Update<T>(IEnumerable<T> items) where T : class, IEntity, new()
        {
            if (items == null)
            {
                return;
            }

            foreach (var item in items)
            {
                Update(item);
            }
        }

        public void AddOrUpdate<T>(T item) where T : class, IEntity, new()
        {
            if (item.Id == 0)
                Add(item);
            else
                Update(item);
        }

        public void AddOrUpdate<T>(IEnumerable<T> items) where T : class, IEntity, new()
        {
            if (items == null)
                return;

            foreach (var item in items)
                AddOrUpdate(item);
        }

        public IEnumerable<DbEntityValidationResult> GetValidationErrors()
        {
            return _context.GetValidationErrors();
        }
    }
}
