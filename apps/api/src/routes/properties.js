import { prisma } from "@inmo-joven/database";
import { propertyToListingDto } from "../lib/listing-dto.js";

/**
 * @param {unknown} err
 */
function isDatabaseUnreachable(err) {
  if (!err || typeof err !== "object") return false;
  const o = /** @type {{ name?: string; code?: string; message?: string }} */ (
    err
  );
  const msg = String(o.message || "");
  return (
    o.name === "PrismaClientInitializationError" ||
    o.code === "P1001" ||
    msg.includes("Can't reach database server")
  );
}

/**
 * @param {import("fastify").FastifyInstance} app
 */
export function registerPropertyRoutes(app) {
  app.get("/properties", async (request, reply) => {
    const limit = Math.min(Math.max(Number(request.query.limit) || 12, 1), 50);
    const offset = Math.max(Number(request.query.offset) || 0, 0);
    const city =
      typeof request.query.city === "string" && request.query.city.trim()
        ? request.query.city.trim()
        : undefined;

    /** @type {import("@prisma/client").Prisma.PropertyWhereInput} */
    const where = { status: "active" };
    if (city) {
      where.city = { contains: city, mode: "insensitive" };
    }

    try {
      const [total, rows] = await prisma.$transaction([
        prisma.property.count({ where }),
        prisma.property.findMany({
          where,
          orderBy: { updatedAt: "desc" },
          take: limit,
          skip: offset,
        }),
      ]);

      return {
        items: rows.map(propertyToListingDto),
        total,
        limit,
        offset,
      };
    } catch (err) {
      if (isDatabaseUnreachable(err)) {
        request.log.warn(
          { err },
          "Base de datos no disponible: /properties devuelve listado vacío.",
        );
        return {
          items: [],
          total: 0,
          limit,
          offset,
          database: "unavailable",
        };
      }
      request.log.error(err);
      return reply.status(500).send({ error: "internal_error" });
    }
  });

  app.get("/properties/:id", async (request, reply) => {
    const { id } = request.params;
    if (typeof id !== "string" || !id) {
      return reply.status(400).send({ error: "invalid_id" });
    }
    try {
      const row = await prisma.property.findFirst({
        where: { id, status: "active" },
      });
      if (!row) {
        return reply.status(404).send({ error: "not_found" });
      }
      return propertyToListingDto(row);
    } catch (err) {
      if (isDatabaseUnreachable(err)) {
        request.log.warn({ err }, "Base de datos no disponible: /properties/:id");
        return reply.status(503).send({ error: "database_unavailable" });
      }
      request.log.error(err);
      return reply.status(500).send({ error: "internal_error" });
    }
  });
}
