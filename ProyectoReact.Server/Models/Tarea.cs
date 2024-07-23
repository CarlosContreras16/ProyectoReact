using System;
using System.Collections.Generic;

namespace ProyectoReact.Server.Models;

public partial class Tarea
{
    public int IdTarea { get; set; }

    public string? Descripcion { get; set; }

    public DateTime FechaRegistro { get; set; }
}
