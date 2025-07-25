/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { DoublyLinkedList, walkList } from "@fluidframework/core-utils/internal";

import { SegmentGroup, type ISegmentLeaf } from "./mergeTreeNodes.js";

export class SegmentGroupCollection {
	private readonly segmentGroups: DoublyLinkedList<SegmentGroup>;

	constructor(private readonly segment: ISegmentLeaf) {
		this.segmentGroups = new DoublyLinkedList<SegmentGroup>();
	}

	public get size(): number {
		return this.segmentGroups.length;
	}

	public get empty(): boolean {
		return this.segmentGroups.empty;
	}

	public enqueue(segmentGroup: SegmentGroup): void {
		this.segmentGroups.push(segmentGroup);
		segmentGroup.segments.push(this.segment);
	}

	public dequeue(): SegmentGroup | undefined {
		return this.segmentGroups.shift()?.data;
	}

	public remove(segmentGroup: SegmentGroup): boolean {
		const found = this.segmentGroups.find((v) => v.data === segmentGroup);
		if (found === undefined) {
			return false;
		}
		this.segmentGroups.remove(found);
		return true;
	}

	public pop(): SegmentGroup | undefined {
		return this.segmentGroups.pop ? this.segmentGroups.pop()?.data : undefined;
	}

	public copyTo(segmentGroups: SegmentGroupCollection): void {
		walkList(this.segmentGroups, (sg) => segmentGroups.enqueueOnCopy(sg.data, this.segment));
	}

	private enqueueOnCopy(segmentGroup: SegmentGroup, sourceSegment: ISegmentLeaf): void {
		this.enqueue(segmentGroup);
		if (segmentGroup.previousProps) {
			// duplicate the previousProps for this segment
			const index = segmentGroup.segments.indexOf(sourceSegment);
			if (index !== -1) {
				segmentGroup.previousProps.push(segmentGroup.previousProps[index]);
			}
		}
	}
}
