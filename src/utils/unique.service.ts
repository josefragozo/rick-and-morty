export function getUniqueItemsById(items: any[]): any[] {
    const uniqueIds = new Set<number>();
    return items.filter(item => {
        if (!uniqueIds.has(item.id)) {
            uniqueIds.add(item.id);
            return true;
        }
        return false;
    });
}