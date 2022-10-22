import Http from "../../interfaces/Http";
import { Request, Response } from 'express';


interface IController extends PropertyDescriptor {
	baseUrl?: string;
	http?: Http
}

export interface IRequest extends Request { }
export interface IResponse extends Response { }

function Controller(path: string = '') {
	return function (target: any) {
		target.prototype.baseUrl = path;
	}
}

function Get(path: string = '') {
	return function (target: any, propertyKey: string, descriptor: IController) {
		const methodOriginal = descriptor.value;
		descriptor.value = async function (...args: any[]) {
			let result;
			this.http?.on('get', this.baseUrl + path, async (req, res) => {
				result = await methodOriginal.apply(this, [req, res]);
			});
			return result;
		}
	}
};

function Post(path: string = '') {
	return function (target: any, propertyKey: string, descriptor: IController) {
		const methodOriginal = descriptor.value;
		descriptor.value = async function (...args: any[]) {
			let result;
			this.http?.on('post', this.baseUrl + path, async (req, res) => {
				result = await methodOriginal.apply(this, [req, res]);
			});
			return result;
		}
	}
};

function Put(path: string = '') {
	return function (target: any, propertyKey: string, descriptor: IController) {
		const methodOriginal = descriptor.value;
		descriptor.value = async function (...args: any[]) {
			let result;
			this.http?.on('put', this.baseUrl + path, async (req, res) => {
				result = await methodOriginal.apply(this, [req, res]);
			});
			return result;
		}
	}
}

function Delete(path: string = '') {
	return function (target: any, propertyKey: string, descriptor: IController) {
		const methodOriginal = descriptor.value;
		descriptor.value = async function (...args: any[]) {
			let result;
			this.http?.on('delete', this.baseUrl + path, async (req, res) => {
				result = await methodOriginal.apply(this, [req, res]);
			});
			return result;
		}
	}
}

export { Controller, Get, Post, Put, Delete };