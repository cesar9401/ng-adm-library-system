export abstract class SimpleList {

  page: number = 1;
  pageSize: number = 25;
  collectionSize: number = 0;
  filters: Map<string, string>;

  protected constructor() {
    this.filters = new Map<string, string>();
    this.filters
      .set('page', `${this.page}`)
      .set('size', `${this.pageSize}`)
  }

  abstract findAll(): void;

  onPageChange(page: number): void {
    this.filters.set('page', `${page}`);
    this.findAll();
  }
}
