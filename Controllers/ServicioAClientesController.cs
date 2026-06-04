using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Cavex.Principal.Data;
using Cavex.Principal.Models;

namespace Cavex.Principal.Controllers
{
    public class ServicioAClientesController : Controller
    {
        private readonly CavexPrincipalContext _context;

        public ServicioAClientesController(CavexPrincipalContext context)
        {
            _context = context;
        }

        // GET: ServicioAClientes
        public async Task<IActionResult> Index()
        {
            return View(await _context.ServicioACliente.ToListAsync());
        }

        // GET: ServicioAClientes/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var servicioACliente = await _context.ServicioACliente
                .FirstOrDefaultAsync(m => m.Id == id);
            if (servicioACliente == null)
            {
                return NotFound();
            }

            return View(servicioACliente);
        }

        // GET: ServicioAClientes/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: ServicioAClientes/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,strValor,Descripcion")] ServicioACliente servicioACliente)
        {
            if (ModelState.IsValid)
            {
                _context.Add(servicioACliente);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(servicioACliente);
        }

        // GET: ServicioAClientes/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var servicioACliente = await _context.ServicioACliente.FindAsync(id);
            if (servicioACliente == null)
            {
                return NotFound();
            }
            return View(servicioACliente);
        }

        // POST: ServicioAClientes/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,strValor,Descripcion")] ServicioACliente servicioACliente)
        {
            if (id != servicioACliente.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(servicioACliente);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ServicioAClienteExists(servicioACliente.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(servicioACliente);
        }

        // GET: ServicioAClientes/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var servicioACliente = await _context.ServicioACliente
                .FirstOrDefaultAsync(m => m.Id == id);
            if (servicioACliente == null)
            {
                return NotFound();
            }

            return View(servicioACliente);
        }

        // POST: ServicioAClientes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var servicioACliente = await _context.ServicioACliente.FindAsync(id);
            if (servicioACliente != null)
            {
                _context.ServicioACliente.Remove(servicioACliente);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ServicioAClienteExists(int id)
        {
            return _context.ServicioACliente.Any(e => e.Id == id);
        }
    }
}
