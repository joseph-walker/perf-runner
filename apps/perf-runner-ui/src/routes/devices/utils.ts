type PartialEntity = { updated_at: string };

export function byUpdatedAt(a: PartialEntity, b: PartialEntity) {
	return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
}
