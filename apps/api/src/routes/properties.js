import { prisma } from "@inmo-joven/database";
import { propertyToListingDto } from "../lib/listing-dto.js";

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
  });

  app.get("/properties/:id", async (request, reply) => {
    const { id } = request.params;
    if (typeof id !== "string" || !id) {
      return reply.status(400).send({ error: "invalid_id" });
    }
    const row = await prisma.property.findFirst({
      where: { id, status: "active" },
    });
    if (!row) {
      return reply.status(404).send({ error: "not_found" });
    }
    return propertyToListingDto(row);
  });
}
